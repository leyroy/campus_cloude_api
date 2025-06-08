import { Request, Response } from 'express';
import { CreateUserDto } from '../../validators/auth.validator';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { AuthService } from './auth.services';

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
    data: results.data,
  });
};

export default signUpController;
