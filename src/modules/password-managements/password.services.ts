import { VerificationType } from '@prisma/client';
import { AppError, ErrorHandler } from '../../middlewares/errorHandler';
import { CommonDbServices } from '../../utils/db/commonDbServices';
import { AuthHelpers } from '../auth/helpers';
import { PasswordHelper } from './passwordHelper';
import { calculateExpirationDate, threeMinutesAgo } from '../../utils/date-time';
import { VerificationEnum } from '../../enums/verification-code.enum';
import { passwordManager } from '../../services/passwordMnager';
import { CangePasswordDto } from '../../types/types';
import { HTTPSTATUS } from '../../constants/http-status';
import { ErrorCode } from '../../enums/error-code.enum';

const commonDbServices = new CommonDbServices();
const authHelpers = new AuthHelpers();
class PasswordServices {
  private passwordHelper: PasswordHelper;
  constructor(passwordHelper: PasswordHelper) {
    this.passwordHelper = passwordHelper;
  }

  public async forgotPassword(email: string) {
    const user = await commonDbServices.getUserByEmail(email);
    if (!user) {
      throw ErrorHandler.notFound(
        `No account was found with the provided email: ${email}`
      );
    }

    //check mail rate limit is 2 emails per 3 or 10 min
    const timeAgo = threeMinutesAgo();
    const maxAttempts = 2;
    const recentAttempts = await this.passwordHelper.getRecentPasswordResetAttempts(
      user.id,
      timeAgo
    );

    if (recentAttempts.length >= maxAttempts) {
      throw ErrorHandler.badRequest(
        `You have exceeded the maximum number of password reset emails. Please try again later.`
      );
    }

    const forgotPasswordToken = authHelpers.createVerificationCode({
      type: VerificationType.PASSWORD_RESET,
      userId: user.id,
      expires: calculateExpirationDate(),
    });
    return forgotPasswordToken;
  }

  public async resetPassword(token: string, newPassword: string) {
    const verificationCode = await commonDbServices.getVerificationCode(
      token,
      VerificationEnum.PASSWORD_RESET
    );

    if (!verificationCode) {
      throw ErrorHandler.notFound('Invalid password reset token');
    }

    if (verificationCode.expires < new Date()) {
      throw ErrorHandler.badRequest('Password reset token has expired');
    }

    const user = await commonDbServices.getUserById(verificationCode.identifier);
    if (!user) {
      throw ErrorHandler.notFound('User not found for the provided token');
    }

    const hashedPassword = await passwordManager.hashPassword(newPassword);
    const isSamePassword = passwordManager.verifyPassword(newPassword, user.password);
    if (isSamePassword) {
      throw ErrorHandler.badRequest(
        'New password cannot be the same as the old password'
      );
    }
    const updatedUser = await this.passwordHelper.updateUserPassword(
      user.id,
      hashedPassword
    );
    if (!updatedUser) {
      throw ErrorHandler.internal('Failed to update user password');
    }
    await commonDbServices.deleteVerificationCode(verificationCode.id);
    return { message: 'Password has been successfully reset' };
  }

  public async changePassword({ userId, oldPassword, newPassword }: CangePasswordDto) {
    const user = await commonDbServices.getUserById(userId);
    if (!user) {
      throw ErrorHandler.notFound('User not found');
    }

    const isOldPasswordValid = passwordManager.verifyPassword(oldPassword, user.password);
    const isSamePassword = passwordManager.verifyPassword(newPassword, user.password);
    if (!isOldPasswordValid) {
      throw new AppError({
        message: 'Invalid old password',
        statusCode: HTTPSTATUS.UNAUTHORIZED,
        errorCode: ErrorCode.INVALID_PASSWORD,
      });
    }
    const hashedNewPassword = await passwordManager.hashPassword(newPassword);
    if (isSamePassword) {
      throw ErrorHandler.badRequest(
        'New password cannot be the same as the old password'
      );
    }
    const updatedUser = await this.passwordHelper.updateUserPassword(
      user.id,
      hashedNewPassword
    );
    if (!updatedUser) {
      throw ErrorHandler.internal('Failed to update user password');
    }
    return { message: 'Password has been successfully changed' };
  }
}

export const passwordServices = new PasswordServices(new PasswordHelper());
