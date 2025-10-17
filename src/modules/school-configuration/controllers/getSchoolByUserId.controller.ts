import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import schoolServices from '../services/schoolServices';
import { CustomRequest } from '../../../types/types';

const getSchoolByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as CustomRequest).user;
  try {
    if (!userId) {
      throw ErrorHandler.forbidden('User id is required');
    }
    const result = await schoolServices.getSchoolByUserID(userId);
    // 🎯 Handle getSchooleById logic here neger 😎
    res.status(200).json({ success: result.success, school: result.data });
  } catch (err) {
    next(err);
  }
};

export default getSchoolByUserId;
