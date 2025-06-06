import { VerificationToken } from '@prisma/client';
import prisma from '../../config/prisma.config';
import { generateUniqueCode } from '../../utils/uuid';
import { fortyFiveMinutesFromNow } from '../../utils/date-time';
import { VerificationEnum } from '../../enums/verification-code.enum';

type TokenType = {
  userId: string;
  type: VerificationEnum;
};

export class AuthHelpers {
  public async createVerificationCode({ userId, type }: TokenType): Promise<VerificationToken> {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        token: generateUniqueCode(),
        expires: fortyFiveMinutesFromNow(),
        identifier: userId,
        type: type
      }
    });
    return verificationToken;
  }
  public async createOwner({ userId }: { userId: string }) {
    return await prisma.owner.create({
      data: {
        userId
      }
    });
  }
  public async LinkSchoolToOwner({ schoolId, ownerId }: { schoolId: string; ownerId: string }) {
    return await prisma.ownersSchool.create({
      data: {
        schoolId,
        ownerId
      }
    });
  }
}
