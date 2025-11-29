import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { classService } from '../services/class.services';
import { HTTPSTATUS } from '../../../constants/http-status';

const deleteClassController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classId } = req.params;
    if (!classId) {
      throw ErrorHandler.forbidden('Class ID is required');
    }
    await classService.deleteClassByClassId(classId);
    res
      .status(HTTPSTATUS.ACCEPTED)
      .json({ success: true, message: 'Class deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export default deleteClassController;
