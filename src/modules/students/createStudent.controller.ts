import { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';

const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const result = await studentServices.createStudent(data);
    res
      .status(200)
      .json({ success: true, message: result.message, modelId: result.newStudent.id });
  } catch (err) {
    next(err);
  }
};

export default createStudentController;
