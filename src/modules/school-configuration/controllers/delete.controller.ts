import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../../types/types';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import schoolServices from '../services/schoolServices';
import { HTTPSTATUS } from '../../../constants/http-status';

const deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
  // 🎯 Handle deleteSchool logic here neger 😎
  const userid = (req as CustomRequest)?.user.userId;
  const { schoolId } = req.params as { schoolId: string };
  if (!userid) {
    //TODO: invoke alert and notification here
    throw ErrorHandler.unauthorized('Unauthorize action');
  }
  if (!schoolId) {
    throw ErrorHandler.notFound();
  }
  const result = await schoolServices.deleteSchool(schoolId);
  res.status(HTTPSTATUS.OK).json(result);
};

export default deleteSchool;
