import { Request, Response, NextFunction } from 'express';

const getSchoolByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 🎯 Handle getSchooleById logic here neger 😎
    res.status(200).json({ message: 'getSchooleById controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default getSchoolByUserId;
