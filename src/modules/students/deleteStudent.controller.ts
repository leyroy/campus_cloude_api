import { Request, Response, NextFunction } from 'express';

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 🎯 Handle deleteStudent logic here neger 😎
    res.status(200).json({ message: 'deleteStudent controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default deleteStudent;
