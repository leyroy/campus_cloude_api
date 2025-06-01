//export all environment constants
export const ENV_CONSTANTS = {
  JWT_ENV: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  PASSWORD_SECRET: process.env.PASSWORD_SECRET
} as const;
