import { NextFunction, Request, Response } from 'express';
import { getAllUsers } from '../services/getUsers';

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  const users = await getAllUsers();
  res.status(200).json({ success: true, data: users, message: 'Users fetched successfully' });
};
