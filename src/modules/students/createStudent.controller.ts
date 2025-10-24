import { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import { CustomRequest } from '../../types/types';
import { ErrorHandler } from '../../middlewares/errorHandler';

const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const { schoolId, userId } = (req as CustomRequest)?.user;
  const indexNumber = '1234567890';
  try {
    if (!schoolId) {
      throw ErrorHandler.forbidden('This action connot be completed');
    }
    const result = await studentServices.createStudent(data, schoolId, indexNumber);
    res
      .status(200)
      .json({ success: true, message: result.message, modelId: result.newStudent.id });
  } catch (err) {
    next(err);
  }
};

export default createStudentController;
