import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "../../../middlewares/errorHandler"
import { getAllUsers } from "../helpers/getUsers"

const errorHandler = new ErrorHandler()
export  const getUsersController = errorHandler.catchAsync(async(req:Request,res:Response,next: NextFunction) => {
  const users = await getAllUsers()
  res.status(200).json({success:true, data:users, message:"Users fetched successfully"})
}) 