import { RequestHandler, Request, Response, NextFunction } from "express";
 import allowedFields from "../allowedFields.json";
import { ErrorHandler } from "./errorHandler";
import { TABELS_NAMES_ENUM } from "../types/shared/types";

export const validatePayload: (model: TABELS_NAMES_ENUM) => RequestHandler =
  (model) => async (req: Request, res: Response, next: NextFunction) => {
    const modelFields = await allowedFields.find(
      (field) => field.modelName === model
    );
    const payload = req.body;
    const dataFields = Object.keys(payload);
    const unwantedFields = dataFields.filter(
      (field) => !modelFields?.fields.includes(field)
    );

    if (unwantedFields.length > 0) {
      console.log({...unwantedFields},"this is unwanted fields from the page:" + model);
      next(ErrorHandler.badRequest(`Invalid fields: ${unwantedFields.join(", ")}`));
    } else {
      next();
    }
  };