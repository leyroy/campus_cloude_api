import prisma from '../../config/prisma.config';

export class PasswordHelper {
  public async getRecentPasswordResetAttempts(userId: string, timeAgo: Date) {
    return await prisma.verificationToken.findMany({
      where: {
        identifier: userId,
        createdAt: {
          gte: timeAgo,
        },
      },
    });
  }
  public async updateUserPassword(userId: string, hashedPassword: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}
