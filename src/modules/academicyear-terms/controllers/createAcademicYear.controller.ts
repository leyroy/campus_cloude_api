import { Request, Response, NextFunction } from 'express';

const createAcademicYearController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 🎯 Handle createAcademicYearController logic here neger 😎
    res
      .status(200)
      .json({ message: 'createAcademicYearController controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default createAcademicYearController;
