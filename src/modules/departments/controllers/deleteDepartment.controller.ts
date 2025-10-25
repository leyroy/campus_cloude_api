import { NextFunction, Request, Response } from 'express';
import { departmentServices } from '../services/department.services';
import { HTTPSTATUS } from '../../../constants/http-status';
import { ErrorHandler } from '../../../middlewares/errorHandler';

const deleteDepartmentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { departmentId } = req.params;
  if (!departmentId) {
    throw ErrorHandler.badRequest('This action connot be completed');
  }
  const result = await departmentServices.deleteDepartment(departmentId);
  res.status(HTTPSTATUS.OK).json({ ...result });
};

export default deleteDepartmentController;
