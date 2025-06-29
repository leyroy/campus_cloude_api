import { Request, Response, NextFunction } from 'express';
import { passwordServices } from './password.services';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { sendEmail } from '../../mailers/mailer';
import { passwordResetTemplate } from '../../mailers/templates/template';
import { HTTPSTATUS } from '../../constants/http-status';

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw ErrorHandler.badRequest('Email is required for password operations');
    }
    const forgotPasswordToken = await passwordServices.forgotPassword(email);
    if (!forgotPasswordToken) {
      throw ErrorHandler.notFound('No account was found with the provided email');
    }
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${forgotPasswordToken.token}`;
    await sendEmail({
      to: email,
      ...passwordResetTemplate(resetLink),
    });
    res
      .status(HTTPSTATUS.OK)
      .json({ success: true, message: 'Password reset email sent successfully' });
  } catch (err) {
    next(err);
  }
};

export default forgotPassword;
