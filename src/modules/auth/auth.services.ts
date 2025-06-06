import { ENV_CONSTANTS } from '../../constants/env_constants';
import { VerificationEnum } from '../../enums/verification-code.enum';
import { sendEmail } from '../../mailers/mailer';
import { verifyEmailTemplate } from '../../mailers/templates/template';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { PasswordService } from '../../services/passwordMnager';
import { CommonDbServices } from '../../utils/db/commonDbServices';
import { CreateUserDto } from '../../validators/auth.validator';
import { AuthHelpers } from './helpers';
const commonDbService = new CommonDbServices();
const passwordManager = new PasswordService();
const authHelpers = new AuthHelpers();

export class AuthService {
  public async registerUser(data: CreateUserDto) {
    const isUserExit = await commonDbService.getUserByPhoneOrEmail({
      phone: data.phone,
      email: data.email
    });
    if (isUserExit) {
      throw ErrorHandler.badRequest('User with this phone or email already exists');
    }
    const { schoolName, ...user } = data;
    const hashedPassword = await passwordManager.hashPassword(user.password);
    const newUser = await commonDbService.createUser({
      ...user,
      password: hashedPassword
    });
    const owner = await authHelpers.createOwner({ userId: newUser.id });
    const school = await commonDbService.createSchool({ name: schoolName });
    await authHelpers.LinkSchoolToOwner({ schoolId: school.id, ownerId: owner.id });
    const verificationCode = await authHelpers.createVerificationCode({ userId: newUser.id, type: VerificationEnum.EMAIL_VERIFICATION });
    const verifyUrl = `${ENV_CONSTANTS.BASE_PATH}/verify-email?token=${verificationCode.token}`;
    sendEmail({
      to: newUser.email,
      ...verifyEmailTemplate(verifyUrl)
    });
    return {
      success: true,
      message: 'User registered successfully',
      data: {
        ...user,
        schoolName
      }
    };
  }
}
