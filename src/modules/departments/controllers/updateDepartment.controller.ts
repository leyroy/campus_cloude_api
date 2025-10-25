import { Request, Response } from 'express';
import { departmentServices } from '../services/department.services';
import { CustomRequest } from '../../../types/types';
import { HTTPSTATUS } from '../../../constants/http-status';

const updateDepartmentController = async (req: Request, res: Response) => {
  const { departmentId } = req.params;
  const { userId } = (req as CustomRequest)?.user;
  const updatedData = req.body;
  await departmentServices.updateDepartment(departmentId, {
    ...updatedData,
    updatedById: userId,
  });
  res.status(HTTPSTATUS.OK).json(updatedData);
};

export default updateDepartmentController;
