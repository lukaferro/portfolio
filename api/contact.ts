import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(data: unknown): void;
}

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

/** Error codes are translated client-side (contatti.form.error.<code>). */
type ErrorCode = 'method' | 'required' | 'email' | 'too_long' | 'captcha' | 'send';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTH = {
  nome: 100,
  email: 254,
  oggetto: 150,
  messaggio: 5000,
} as const;

const RECAPTCHA_MIN_SCORE = 0.5;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Accept only strings: arrays/objects in a crafted JSON body become empty values. */
function readField(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === 'string' ? value.trim() : '';
}

/** Header values (name, subject) must stay on a single line. */
function singleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ');
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env['RECAPTCHA_SECRET_KEY'];
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not set: skipping captcha verification');
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      signal: AbortSignal.timeout(5000),
    });

    const data = await res.json() as { success: boolean; score?: number; action?: string };
    return data.success && (data.score ?? 0) >= RECAPTCHA_MIN_SCORE && data.action === 'submit';
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return false;
  }
}

function fail(res: VercelResponse, status: number, code: ErrorCode) {
  return res.status(status).json({ error: code });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return fail(res, 405, 'method');
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;

  // Honeypot: real users never see this field, bots usually fill it. Pretend success.
  if (readField(body, 'website')) {
    return res.status(200).json({ success: true });
  }

  const nome = singleLine(readField(body, 'nome'));
  const email = readField(body, 'email');
  const oggetto = singleLine(readField(body, 'oggetto'));
  const messaggio = readField(body, 'messaggio');
  const recaptchaToken = readField(body, 'recaptchaToken');

  if (!nome || !email || !oggetto || !messaggio) {
    return fail(res, 400, 'required');
  }

  if (
    nome.length > MAX_LENGTH.nome ||
    email.length > MAX_LENGTH.email ||
    oggetto.length > MAX_LENGTH.oggetto ||
    messaggio.length > MAX_LENGTH.messaggio
  ) {
    return fail(res, 400, 'too_long');
  }

  if (!EMAIL_REGEX.test(email)) {
    return fail(res, 400, 'email');
  }

  if (!(await verifyRecaptcha(recaptchaToken))) {
    return fail(res, 400, 'captcha');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS'],
    },
  });

  try {
    await transporter.sendMail({
      // Object form lets nodemailer encode the display name safely
      from: { name: `${nome} (Portfolio)`, address: process.env['EMAIL_USER'] ?? '' },
      replyTo: { name: nome, address: email },
      to: process.env['EMAIL_USER'],
      subject: `[Portfolio] ${oggetto}`,
      text: `Nome: ${nome}\nEmail: ${email}\nOggetto: ${oggetto}\n\n${messaggio}`,
      html: `
        <h3>Nuovo messaggio dal portfolio</h3>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Oggetto:</strong> ${escapeHtml(oggetto)}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${escapeHtml(messaggio).replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Errore invio email:', err);
    return fail(res, 500, 'send');
  }
}
