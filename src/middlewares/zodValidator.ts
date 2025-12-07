import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from './errorHandler';
import { HTTPSTATUS } from '../constants/http-status';
import { ErrorCode } from '../enums/error-code.enum';

const zodValidator = <T>(Schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = Schema.safeParse(req.body);
    if (!result.success) {
      console.log(result.error);
      throw new AppError({
        message: result.error.errors
          .map((err) => `${err.path.join('.')} - ${err.message}`)
          .join(', '),
        statusCode: HTTPSTATUS.BAD_REQUEST,
        errorCode: ErrorCode.VALIDATION_ERROR,
      });
    }
    req.body = result.data;
    next();
  };
};

export default zodValidator;
