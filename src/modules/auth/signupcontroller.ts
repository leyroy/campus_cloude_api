import { User } from "@prisma/client";
import {Request,Response,NextFunction } from "express";

const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data } = req.body as { data: User };
};

export default signUpController;
