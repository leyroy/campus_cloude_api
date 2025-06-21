import { Request, Response, NextFunction } from 'express';
import { userServices } from '../services/user.services';
import { CustomRequest } from '../../../types/types';

const controllerName = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as CustomRequest)?.user;
  const userProfile = await userServices.getAuthUserProfile(userId);
  res.status(200).json({
    success: true,
    message: 'User profile retrieved successfully',
    data: userProfile,
  });
};

export default controllerName;
