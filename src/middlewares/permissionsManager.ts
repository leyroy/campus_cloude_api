import { Request, Response, NextFunction } from "express";
import { CustomRequest, PERMISSION } from "../types/shared/types";
import { ErrorHandler } from "./errorHandler";
import { CommonDbServices } from "../utils/db/commonDbServices";
import { hasPermission, HasPermission } from "../utils/hasPermissions";

const commonDbServices = new CommonDbServices();

const permissionHandler = ({resource, action}: PERMISSION) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest)?.user;
    if (!user || !user.userId) {
      throw ErrorHandler.unauthorized("Please log in to access this resource");
    }
    try {
      // 🎯 Handle controllerName logic here neger 😎
      const isUserExit = await commonDbServices.getUserById(user.userId)
      if(!isUserExit){
        throw ErrorHandler.unauthorized("Please log in and try agian")
      }
      const hasPemissionPayload = {
        userId: user.userId,
        resource: resource,
        action,
      } as HasPermission;
      if (!(await hasPermission(hasPemissionPayload))) {
        throw ErrorHandler.forbidden(
          `You're not allowed to ${action} ${resource}`
        );
      }
      next();
    } catch (error) {
      console.log("error from pemissionManager",error)
      next(error)
    }
  };
};

export default permissionHandler;
