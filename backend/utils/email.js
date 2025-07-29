import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../configu/environment.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"FitTracker Pro" <${EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

export const sendResetEmail = async (to, token) => {
  const link = `http://localhost:3000/reset-password?token=${token}`;
  const html = `
    <p>Hola,</p>
    <p>Has solicitado restablecer tu contraseña.</p>
    <a href="${link}">${link}</a>
    <p>Este enlace expira en 1 hora.</p>
  `;
  await sendEmail({ to, subject: 'Restablece tu contraseña', html });
};
