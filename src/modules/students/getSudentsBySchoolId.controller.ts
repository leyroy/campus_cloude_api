import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../types/types';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { studentServices } from './student.services';

const getStudentsBySchoolId = async (req: Request, res: Response, next: NextFunction) => {
  const { schoolId } = (req as CustomRequest)?.user;
  try {
    if (!schoolId) {
      throw ErrorHandler.badRequest('School ID not found in user token');
    }
    const students = await studentServices.getStudentsBySchoolId(schoolId);
    res.status(200).json({ success: true, students: students });
  } catch (err) {
    next(err);
  }
};

export default getStudentsBySchoolId;
