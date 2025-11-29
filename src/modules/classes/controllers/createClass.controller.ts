import { Request, Response } from 'express';
import { classService } from '../services/class.services';
import { CustomRequest } from '../../../types/types';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { CreateClassInput } from '../types';
import { HTTPSTATUS } from '../../../constants/http-status';

const createClassController = async (req: Request, res: Response) => {
  // 🎯 Handle createClass logic here neger 😎
  const data = req.body as CreateClassInput;
  const schoolId = (req as CustomRequest)?.user?.schoolId;
  const userId = (req as CustomRequest)?.user?.userId;
  if (!schoolId) {
    throw ErrorHandler.badRequest('School ID is required');
  }
  await classService.createClass({ ...data, schoolId, createdById: userId });
  res
    .status(HTTPSTATUS.CREATED)
    .json({ success: true, message: 'Class created successfully' });
};

export default createClassController;
