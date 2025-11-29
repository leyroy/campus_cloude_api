import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { classService } from '../services/class.services';

const getClassDetailByClassIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { classId } = req.params;
    if (!classId) {
      throw ErrorHandler.badRequest('Class ID is required');
    }
    // 🎯 Handle getClassDetails logic here neger 😎
    const result = await classService.getClassById(classId);
    if (!result) {
      throw ErrorHandler.notFound('Class not found');
    }
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export default getClassDetailByClassIdController;
