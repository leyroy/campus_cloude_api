import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { StudentUpdateDto } from './types';
import { studentServices } from './student.services';

const updateStuent = async (req: Request, res: Response, next: NextFunction) => {
  const { studentId } = req.params;
  const data = req.body satisfies StudentUpdateDto;
  try {
    if (!studentId) {
      throw ErrorHandler.badRequest('Student ID is required');
    }
    const results = await studentServices.updateStudent(studentId, data);
    res.status(200).json({ ...results });
  } catch (err) {
    next(err);
  }
};

export default updateStuent;
