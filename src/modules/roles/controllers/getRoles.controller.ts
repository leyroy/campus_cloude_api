import { Request, Response, NextFunction } from 'express';
import { getRoles } from '../helpers/getRoles';

const getRolesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await getRoles();
    res.status(200).json({ message: 'getRolesController is live 🧨', roles: roles });
  } catch (err) {
    next(err);
  }
};

export default getRolesController;
