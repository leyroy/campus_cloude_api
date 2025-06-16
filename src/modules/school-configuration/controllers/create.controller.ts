import { SchoolProfile } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../../types/types';

const configureSchoole = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as SchoolProfile;
  const userId = (req as CustomRequest)?.user.userId;
  res.status(200).json({ message: 'createSchoole controller is live 🧨' });
};

export default configureSchoole;
