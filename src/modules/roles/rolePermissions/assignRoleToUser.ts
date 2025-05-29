import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandler";
import { assignRoleToUser } from "../../../services/role/assignRoleToUser";

export const assignRoleToUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, assignedById, roleId } = req.body as {
    userId: string;
    assignedById: string;
    roleId: string;
  };

  const results = (await assignRoleToUser({userId, assignedById, roleId}));
  if (!results?.success || !results) {
    next(ErrorHandler.badRequest("Failed to assign role"));
  }
  res.status(200).json({...results});
};
