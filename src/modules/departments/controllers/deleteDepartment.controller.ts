import { Request, Response } from 'express';
import { departmentServices } from '../services/department.services';
import { HTTPSTATUS } from '../../../constants/http-status';

const deleteDepartmentController = async (req: Request, res: Response) => {
  // 🎯 Handle deleteDepartment logic here neger 😎
  const { departmentId } = req.params;
  const result = await departmentServices.deleteDepartment(departmentId);
  res.status(HTTPSTATUS.OK).json({ ...result });
};

export default deleteDepartmentController;
