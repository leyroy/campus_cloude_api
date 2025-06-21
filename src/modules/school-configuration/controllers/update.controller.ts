import { Request, Response, NextFunction } from 'express';
import schoolServices from '../services/schoolServices';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { CustomRequest } from '../../../types/types';

const updateSchool = async (req: Request, res: Response, next: NextFunction) => {
  const { schoolId } = req.params as { schoolId: string };
  const userId = (req as CustomRequest).user.userId;
  if (!userId) {
    throw ErrorHandler.unauthorized('User ID is required for updating school information');
  }
  if (!schoolId) {
    throw ErrorHandler.badRequest('School ID is required for updating school information');
  }
  const result = await schoolServices.updateSchoolInfo(schoolId, req.body);
  res.status(200).json({ success: result.success, message: result.message });
};

export default updateSchool;
