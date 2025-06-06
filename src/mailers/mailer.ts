import { ENV_CONSTANTS } from '../constants/env_constants';
import { resend } from './resendClient';

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender = ENV_CONSTANTS.NODE_ENV === 'development' ? `no-reply <onboarding@resend.dev>` : `no-reply <${ENV_CONSTANTS.MAILER_SENDER}>`;

export const sendEmail = async ({ to, from = mailer_sender, subject, text, html }: Params) =>
  await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    text,
    subject,
    html
  });
