import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(data: unknown): void;
}

interface VercelRequest extends IncomingMessage {
  body?: Record<string, string>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const { nome, email, oggetto, messaggio } = req.body ?? {};

  if (!nome || !email || !oggetto || !messaggio) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori.' });
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
      from: `"${nome}" <${process.env['EMAIL_USER']}>`,
      replyTo: email,
      to: process.env['EMAIL_USER'],
      subject: `[Portfolio] ${oggetto}`,
      html: `
        <h3>Nuovo messaggio dal portfolio</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Oggetto:</strong> ${oggetto}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${(messaggio ?? '').replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Errore invio email:', err);
    return res.status(500).json({ error: 'Errore nell\'invio del messaggio. Riprova più tardi.' });
  }
}
