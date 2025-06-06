import { Resend } from 'resend';
import { ENV_CONSTANTS } from '../constants/env_constants';

export const resend = new Resend(ENV_CONSTANTS.RESEND_API_KEY);
