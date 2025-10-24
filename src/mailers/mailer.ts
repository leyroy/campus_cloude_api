import mjml2html from 'mjml';
import { ENV_CONSTANTS } from '../constants/env_constants';
import { resend } from './resendClient';
import fs from 'fs';

type Params = {
  to: string | string[];
  subject: string;
  // text: string;
  template: string;
  from?: string;
  value: string;
};

const mailer_sender =
  ENV_CONSTANTS.NODE_ENV === 'development'
    ? `no-reply <onboarding@resend.dev>`
    : `no-reply <${ENV_CONSTANTS.MAILER_SENDER}>`;

export const sendEmail = async ({
  value,
  to,
  from = mailer_sender,
  subject,
  template,
}: Params) => {
  const { html: generateEmail } = mjml2html(
    fs
      .readFileSync(template, 'utf8')
      .replace(/{{otp}}/g, value)
      .replace(/{{resetUrl}}/g, value)
  );
  try {
    const info = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: generateEmail,
    });
    console.log('Email sent:', info);
  } catch (error) {
    throw Error;
  }
};
