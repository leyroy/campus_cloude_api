import { Request, Response } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { AuthService } from './auth.services';
import { CreateUserDto } from './auth.validator';

const authService = new AuthService();
const signUpController = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto;
  const results = await authService.registerUser(data);
  if (!results.success) {
    throw ErrorHandler.badRequest(results.message);
  }
  res.status(200).json({
    success: true,
    message: 'User registered successfully',
  });
};

export default signUpController;
