import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../../../middlewares/errorHandler";
import { assignRolesHelper } from "../../../services/role/assignRolesHelper";

export const assignRoles = async(req:Request,res:Response,nex:NextFunction)=>{
  const {userId,assignedById, roleId}= req.body as {userId:string,assignedById:string,roleId:string}
  const results = await assignRolesHelper(userId,assignedById,roleId)
  if(!results?.success|| !results){
    throw ErrorHandler.badRequest()
  }
  res.status(200).json({
    success:results.success,
    message:results?.message||"Role assign successfully"
  })
}