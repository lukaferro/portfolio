import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(data: unknown): void;
}

interface VercelRequest extends IncomingMessage {
  body?: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env['RECAPTCHA_SECRET_KEY'];
  if (!secretKey) return true;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`
    });

    const data = await res.json() as { success: boolean; score: number };
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { nome, email, oggetto, messaggio, recaptchaToken } = req.body ?? {};

  if (!nome?.trim() || !email?.trim() || !oggetto?.trim() || !messaggio?.trim()) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori.' });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: 'Indirizzo email non valido.' });
  }

  const captchaValid = await verifyRecaptcha(recaptchaToken ?? '');
  if (!captchaValid) {
    console.warn('reCAPTCHA verification failed or timed out, proceeding anyway');
  }

  const safeNome = escapeHtml(nome.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeOggetto = escapeHtml(oggetto.trim());
  const safeMessaggio = escapeHtml(messaggio.trim()).replace(/\n/g, '<br>');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS'],
    },
  });

  try {
    await transporter.sendMail({
      from: `"${safeNome}" <${process.env['EMAIL_USER']}>`,
      replyTo: email.trim(),
      to: process.env['EMAIL_USER'],
      subject: `[Portfolio] ${oggetto.trim()}`,
      html: `
        <h3>Nuovo messaggio dal portfolio</h3>
        <p><strong>Nome:</strong> ${safeNome}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Oggetto:</strong> ${safeOggetto}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${safeMessaggio}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Errore invio email:', err);
    return res.status(500).json({ error: 'Errore nell\'invio del messaggio. Riprova più tardi.' });
  }
}
