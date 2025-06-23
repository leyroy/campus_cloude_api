import { Request, Response } from 'express';

const createClassController = async (req: Request, res: Response) => {
  // 🎯 Handle createClass logic here neger 😎
  res.status(200).json({ message: 'createClass controller is live 🧨' });
};

export default createClassController;
