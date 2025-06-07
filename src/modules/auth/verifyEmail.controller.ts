import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { AuthService } from './auth.services';

const authService = new AuthService();
const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.query as { code?: string };
    if (!code) {
      throw ErrorHandler.badRequest('Verification code is required');
    }
    const results = await authService.verifyEmail(code);
    if (!results) throw ErrorHandler.badRequest('Invalid verification code or it has expired');
    res.status(200).json({ message: 'verifyEmailController is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default verifyEmailController;
