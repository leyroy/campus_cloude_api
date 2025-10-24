import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { studentServices } from './student.services';

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  const {studentId} = req.params
  try {
    if(!studentId) {
      throw ErrorHandler.forbidden("This action cannot be completed.")
    }
    const results = studentServices.deleteStudent(studentId)
    res.status(200).json({ message: 'deleteStudent controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default deleteStudent;
