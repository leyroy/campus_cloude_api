import { Request, Response } from 'express';
import { departmentServices } from '../services/department.services';
import { HTTPSTATUS } from '../../../constants/http-status';

const getDepartmentById = async (req: Request, res: Response) => {
  // 🎯 Handle controllerName logic here neger 😎
  const { departmentId } = req.params;
  const result = await departmentServices.getDepartmentById(departmentId);
  res.status(HTTPSTATUS.OK).json({ ...result });
};

export default getDepartmentById;
