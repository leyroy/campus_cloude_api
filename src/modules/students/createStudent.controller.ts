import { Request, Response, NextFunction } from 'express';

const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 🎯 Handle createStudentController logic here neger 😎
    res.status(200).json({ message: 'createStudentController controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default createStudentController;
