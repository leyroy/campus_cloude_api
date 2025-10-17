import prisma from '../../../config/prisma.config';

export class UserHelpers {
  public getUserProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        school: {
          // where: { isDeleted: false, isActive: true, status: 'ACTIVE' },
          include: {
            owner: true,
          },
        },
      },
    });
  }
}
