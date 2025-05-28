//function to add role permissions

import { Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandler";
import { addRolePermissionsHelper } from "../../../services/role/addRolePermissionsHelper";

export const addRolePermissions = async (req:Request,res:Response)=>{
  const { roleId, permissionIds } = req.body;
  
  const results = await addRolePermissionsHelper(roleId, permissionIds);
  if (!results.success) {
    throw ErrorHandler.internal("Failed to add role permissions");
  }
  res.status(200).json({
    success: results.success,
    message: results.message || "Role permissions added successfully",
  });
}