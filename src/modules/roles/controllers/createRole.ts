import { Request, Response } from "express";
import { Role } from "../../../generated/prisma";
import { createRole } from "../../../services/role/createRole";
import { ErrorHandler } from "../../../middlewares/errorHandler";

export async function createRoleController(req: Request, res: Response) {
  const data = req.body as Role;
  console.log(data)
  const createdResult = await createRole(data);
  if (!createdResult.success || !createdResult) {
    throw ErrorHandler.internal("Failed to create role");
  }
  res.status(201).json({
    success: true,
    message: "Role created successfully",
  });
}
