import { VerificationToken, VerificationType } from '@prisma/client';
import prisma from '../../config/prisma.config';
import { generateUniqueCode } from '../../utils/uuid';
import { VerificationEnum } from '../../enums/verification-code.enum';
import { CreateSessionDto } from './types';

type TokenType = {
  userId: string;
  type: VerificationType;
  expires: Date;
};

export class AuthHelpers {
  public async createVerificationCode({
    userId,
    type,
    expires,
  }: TokenType): Promise<VerificationToken> {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        token: generateUniqueCode(),
        expires: expires,
        identifier: userId,
        type: type,
      },
    });
    return verificationToken;
  }
  public async createOwner({ userId }: { userId: string }) {
    return await prisma.owner.create({
      data: {
        schoolId: userId,
        educationBackground: '',
        currentPosition: '',
        professionalExperience: '',
        previousPositions: '',
        yearsInEducation: 4,
      },
    });
  }

  public async createSession(session: CreateSessionDto) {
    return await prisma.session.create({
      data: {
        expires: session.expires,
        ipAddress: session.ipAddress,
        sessionToken: session.sessionToken,
        userAgent: session.userAgent,
        userId: session.userId,
        isActive: true,
      },
    });
  }
  public async getVerificationCode(code: string, type: VerificationEnum) {
    return await prisma.verificationToken.findUnique({
      where: {
        token: code,
        type: type,
        expires: {
          gte: new Date(),
        },
      },
    });
  }
  public async verifyUser(identifier: string) {
    const verifiedUser = await prisma.user.update({
      where: { id: identifier },
      data: { isEmailVerified: true },
    });
    return verifiedUser;
  }

  public async getSessionById(sessionId: string) {
    return await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
      },
    });
  }
  public async updateSessionExpirationData(sessionId: string, newExpirationDate: Date) {
    return await prisma.session.update({
      where: { id: sessionId },
      data: { expires: newExpirationDate },
    });
  }
}
