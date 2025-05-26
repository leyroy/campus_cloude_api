import { NextFunction, Request, Response } from "express";
import { UserSchema } from "../../../libs/utils/types/zodschemers/user";
import { ErrorHandler } from "../../../libs/utils/errorHandler";


export const createUser = async(req:Request, res:Response,next:NextFunction)=>{
  try {
    const data = req.body
    //TODO: verify user data
    const user = UserSchema.safeParse(data);

    if (!user.success) {
      throw ErrorHandler.badRequest("Invalid user data");
    }

    //TODO: create user in database
    
  } catch (error) {

    if (error instanceof Error) {
     
    }
  }
}