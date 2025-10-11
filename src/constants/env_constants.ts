//export all environment constants
export const ENV_CONSTANTS = {
  JWT_ENV: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
  BASE_PATH: process.env.BASE_PATH,
  FRONTEND_BASE_PATH: process.env.FRONTEND_BASE_PATH,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM,
  MAILER_SENDER: process.env.MAILER_SENDER,
  NODE_ENV: process.env.NODE_ENV,
} as const;
