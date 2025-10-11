// utils/mailer.ts
import nodemailer, { Transporter } from 'nodemailer';
import mjml2html from 'mjml';
import fs from 'fs';

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail', // or custom SMTP settings
  auth: {
    user: 'leyroycontact@gmail.com',
    pass: 'oayhiobkbnlwcoja',
  },
});

export interface MailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  value: string;
  template: string;
}

const sendEmail = async ({
  value,
  to,
  subject,
  text,
  template,
}: MailOptions): Promise<boolean> => {
  const { html: otpHtml } = mjml2html(
    fs
      .readFileSync(template, 'utf8')
      .replace('${otp}', value)
      .replace(/{{resetUrl}}/g, value)
  );
  try {
    const info = await transporter.sendMail({
      from: `no-reply <${process.env.MAIL_USER}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html: otpHtml,
    });
    console.log('Email sent:', info.messageId);
    return true;
  } catch (err: any) {
    console.error('Nodemailer error:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
    return false;
  }
};

export default sendEmail;
