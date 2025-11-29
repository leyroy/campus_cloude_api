import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { classService } from '../services/class.services';

const updateClassController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classId } = req.params;
    const data = req.body;
    if (!classId) {
      throw ErrorHandler.forbidden('Class ID is required');
    }
    await classService.updateClass({ ...data }, classId);
    // 🎯 Handle updateClassController logic here neger 😎
    res.status(200).json({ message: 'Class updated successfully' });
  } catch (err) {
    next(err);
  }
};

export default updateClassController;
