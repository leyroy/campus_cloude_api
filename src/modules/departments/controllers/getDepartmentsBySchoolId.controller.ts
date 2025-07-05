import { Request, Response } from 'express';
import { CustomRequest } from '../../../types/types';
import { AppError, ErrorHandler } from '../../../middlewares/errorHandler';
import { HTTPSTATUS } from '../../../constants/http-status';
import { ErrorCode } from '../../../enums/error-code.enum';
import { departmentServices } from '../services/department.services';

const getDepartmentBySchoolId = async (req: Request, res: Response) => {
  const { schoolId } = (req as CustomRequest).user;
  if (!schoolId) {
    throw ErrorHandler.unauthorized();
  }
  const result = await departmentServices.getDepartmentsBySchoolId(schoolId);
  res.status(HTTPSTATUS.OK).json({ ...result });
};

export default getDepartmentBySchoolId;
