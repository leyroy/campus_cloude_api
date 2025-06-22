import { ENV_CONSTANTS } from '../../constants/env_constants';
import { HTTPSTATUS } from '../../constants/http-status';
import { ErrorCode } from '../../enums/error-code.enum';
import { VerificationEnum } from '../../enums/verification-code.enum';
import { sendEmail } from '../../mailers/mailer';
import { verifyEmailTemplate } from '../../mailers/templates/template';
import { AppError, ErrorHandler } from '../../middlewares/errorHandler';
import { passwordManager } from '../../services/passwordMnager';
import {
  calculateExpirationDate,
  fortyFiveMinutesFromNow,
  ONE_DAY_IN_MS,
} from '../../utils/date-time';
import { commonDbService } from '../../utils/db/commonDbServices';
import { generateTokens, verifyJwtToken } from '../../utils/jwt';
import { generateUniqueCode } from '../../utils/uuid';
import { CreateUserDto, LoginDto } from './auth.validator';
import { AuthHelpers } from './helpers';
import { CreateSessionDto } from './types';

const authHelpers = new AuthHelpers();

interface LoginPayload extends LoginDto {
  userAgent?: string;
  ipAddress?: string;
}

export class AuthService {
  public async registerUser(data: CreateUserDto) {
    const { confirmPassword, ...user } = data;
    const hashedPassword = await passwordManager.hashPassword(user.password);
    const newUser = await commonDbService.createUser({
      ...user,
      confirmPassword: confirmPassword,
      password: hashedPassword,
    });
    const verificationCode = await authHelpers.createVerificationCode({
      userId: newUser.id,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expires: fortyFiveMinutesFromNow(),
    });
    const verifyUrl = `${ENV_CONSTANTS.BASE_PATH}/verify-email?token=${verificationCode.token}`;
    sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verifyUrl),
    });
    return {
      success: true,
      message:
        'User registered successfully and verification code was sent to your email, pleas kindly verify your account',
      data: {
        ...user,
      },
    };
  }

  public async loginUser({ email, password, phone, userAgent, ipAddress }: LoginPayload) {
    const isUserExit = await commonDbService.getUserByPhoneOrEmail({
      email,
      phone,
    });
    if (!isUserExit) {
      throw ErrorHandler.notFound('Invalid credentials');
    }
    const isValidPassword = await passwordManager.verifyPassword(
      password,
      isUserExit.password
    );
    if (!isValidPassword) {
      throw ErrorHandler.unauthorized('Invalid credentials');
    }
    if (!isUserExit.isActive) {
      throw ErrorHandler.badRequest(
        `Account: ${isUserExit.email} is not activated, please kindly wait until we activate your account`
      );
    }
    if (!isUserExit.isEmailVerified) {
      const verificationCode = await authHelpers.createVerificationCode({
        userId: isUserExit.id,
        type: VerificationEnum.EMAIL_VERIFICATION,
        expires: fortyFiveMinutesFromNow(),
      });
      const verifyUrl = `${ENV_CONSTANTS.BASE_PATH}/verify-email?token=${verificationCode.token}`;
      return {
        refreshToken: '',
        accessToken: '',
        url: verifyUrl,
        isEmailVerified: false,
      };
    }

    const sessionPayload: CreateSessionDto = {
      expires: calculateExpirationDate('7d'),
      userAgent: userAgent!,
      ipAddress: ipAddress!,
      sessionToken: generateUniqueCode(),
      userId: isUserExit.id,
    };

    const session = await authHelpers.createSession(sessionPayload);
    const { accessToken, refreshToken } = generateTokens({
      userId: isUserExit.id,
      sessionId: session.id,
      schoolId: isUserExit.schoolId as string,
    });
    return {
      accessToken,
      isEmailVerified: true,
      refreshToken,
    };
  }

  public async verifyEmail(code: string) {
    const verificationToken = await authHelpers.getVerificationCode(
      code,
      VerificationEnum.EMAIL_VERIFICATION
    );
    if (!verificationToken) {
      throw ErrorHandler.notFound('Code verification code was not found');
    }
    const verifiedUser = await authHelpers.verifyUser(verificationToken.identifier);
    if (!verifiedUser)
      throw ErrorHandler.badRequest(
        'We were not able to verify your account, please try again later'
      );
    await commonDbService.deleteVerificationCode(verificationToken.id);
    return true;
  }
  public async refreshToken(token: string) {
    const { error, payload } = verifyJwtToken(token);
    if (error || !payload) {
      throw new AppError({
        message: error || 'Invalid refresh token',
        statusCode: HTTPSTATUS.BAD_REQUEST,
        errorCode: ErrorCode.AUTH_REFRESH_TOKEN_NOT_FOUND,
      });
    }
    const sessionWithUser = await authHelpers.getSessionById(payload.sessionId);
    if (!sessionWithUser) {
      throw ErrorHandler.notFound('Session not found');
    }
    const { user, ...session } = sessionWithUser;
    if (!session.isActive) {
      throw ErrorHandler.badRequest('Session is not active');
    }
    const now = Date.now();
    const sessionNeedsToBeUpdated = session.expires.getTime() - now < ONE_DAY_IN_MS;
    if (sessionNeedsToBeUpdated) {
      await authHelpers.updateSessionExpirationData(
        session.id,
        calculateExpirationDate(ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN)
      );
    }
    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      sessionId: session.id,
    });
    return {
      accessToken,
      refreshToken: sessionNeedsToBeUpdated ? refreshToken : undefined,
    };
  }
}
