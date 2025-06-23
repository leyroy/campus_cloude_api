import { Request, Response } from 'express';
import { CustomRequest } from '../../../types/types';
import { AppError } from '../../../middlewares/errorHandler';
import { HTTPSTATUS } from '../../../constants/http-status';
import { ErrorCode } from '../../../enums/error-code.enum';
import { departmentServices } from '../services/department.services';

const getDepartmentBySchoolId = async (req: Request, res: Response) => {
  const { schoolId } = (req as CustomRequest).user;
  if (!schoolId) {
    throw new AppError({
      message: 'User not is not authenticated',
      statusCode: HTTPSTATUS.UNAUTHORIZED,
      errorCode: ErrorCode.AUTH_NOT_FOUND,
    });
  }
  const result = await departmentServices.getDepartmentsBySchoolId(schoolId);
  res.status(200).json({ ...result });
};

export default getDepartmentBySchoolId;
