import { Request, Response, NextFunction } from 'express';
import { passwordServices } from './password.services';
import { ErrorHandler } from '../../middlewares/errorHandler';
import sendEmail from '../../mailers/node-mailer';
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
    //TODO: Update the reset link to point to the frontend application and design a reset password email template
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${forgotPasswordToken.token}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      template: './templates/otp.mjml',
      value: resetLink,
    });
    res
      .status(HTTPSTATUS.OK)
      .json({ success: true, message: 'Password reset email sent successfully' });
  } catch (err) {
    next(err);
  }
};

export default forgotPassword;
