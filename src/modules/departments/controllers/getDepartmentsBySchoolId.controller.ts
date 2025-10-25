import { Request, Response } from 'express';
import { CustomRequest } from '../../../types/types';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { HTTPSTATUS } from '../../../constants/http-status';
import { departmentServices } from '../services/department.services';

const getDepartmentBySchoolId = async (req: Request, res: Response) => {
  const { schoolId } = (req as CustomRequest).user;
  if (!schoolId) {
    throw ErrorHandler.unauthorized();
  }
  console.log(schoolId, 'this is the school id');
  const result = await departmentServices.getDepartmentsBySchoolId(schoolId);
  res.status(HTTPSTATUS.OK).json({ success: result.success, department: result.data });
};

export default getDepartmentBySchoolId;
