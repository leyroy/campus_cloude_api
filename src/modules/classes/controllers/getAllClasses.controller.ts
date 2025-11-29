import { Request, Response, NextFunction } from 'express';
import { classService } from '../services/class.services';
import { HTTPSTATUS } from '../../../constants/http-status';

const getAllClassesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await classService.listClassesByAdming();
    res.status(HTTPSTATUS.OK).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export default getAllClassesController;
