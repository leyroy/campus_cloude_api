export type CreateSessionDto = {
  expires: Date;
  ipAddress: string;
  sessionToken: string;
  userAgent: string;
  userId: string;
  isActive?: string;
};
