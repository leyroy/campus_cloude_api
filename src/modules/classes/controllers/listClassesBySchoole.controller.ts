import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { classService } from '../services/class.services';
import { HTTPSTATUS } from '../../../constants/http-status';

const getClassesBySchooleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schoolId = req.params.schoolId;
    if (!schoolId) {
      throw ErrorHandler.badRequest('School ID is required');
    }
    const result = await classService.listClassesBySchoolId(schoolId);
    // 🎯 Handle getClassesBySchoole logic here neger 😎
    res.status(HTTPSTATUS.OK).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export default getClassesBySchooleController;
