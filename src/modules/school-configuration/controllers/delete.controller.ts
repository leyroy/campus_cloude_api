import { Request, Response, NextFunction } from 'express';

const deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 🎯 Handle deleteSchool logic here neger 😎
    res.status(200).json({ message: 'deleteSchool controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default deleteSchool;
