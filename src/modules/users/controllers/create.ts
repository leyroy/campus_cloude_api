import { NextFunction, Request, Response } from 'express';
import { UserSchema } from '../../../types/zodschemers/user';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { createUserHelper } from '../services/createUserHalepr';

const errorHnadler = new ErrorHandler();
export const createUserController = errorHnadler.catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log('Received data:', data);
    const user = UserSchema.safeParse(data);

    if (!user.success) {
      console.log(user.error, user.success, user.data);
      throw ErrorHandler.badRequest('Invalid user data');
    }
    const response = await createUserHelper(data);
    return res.status(201).json({
      success: true,
      message: response.message,
    });
  }
);

export default createUserController;
