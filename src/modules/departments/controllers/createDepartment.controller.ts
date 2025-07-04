import { Request, Response } from 'express';
import { CustomRequest } from '../../../types/types';
import { departmentServices } from '../services/department.services';
import { AppError } from '../../../middlewares/errorHandler';
import { HTTPSTATUS } from '../../../constants/http-status';
import { ErrorCode } from '../../../enums/error-code.enum';
import { CreateDepartmentType } from '../types';

const createDepartmentController = async (req: Request, res: Response) => {
  const { name, description } = req.body as CreateDepartmentType;
  const { userId, schoolId } = (req as CustomRequest).user;
  if (!schoolId || !userId) {
    throw new AppError({
      message: 'Unauthorized action',
      statusCode: HTTPSTATUS.UNAUTHORIZED,
      errorCode: ErrorCode.AUTH_TOKEN_NOT_FOUND,
    });
  }
  const result = await departmentServices.createDepartment({
    name,
    description,
    schoolId,
    updatedById: userId,
  });
  res.status(HTTPSTATUS.OK).json(result);
};

export default createDepartmentController;
