import { Request, Response } from 'express';
import { departmentServices } from '../services/department.services';
import { ErrorHandler } from '../../../middlewares/errorHandler';

const deleteDepartmentController = async (req: Request, res: Response) => {
  // 🎯 Handle deleteDepartment logic here neger 😎
  const { departmentId } = req.params;
  const result = await departmentServices.deleteDepartment(departmentId);
  if (!result || !result.success) {
    throw ErrorHandler.badRequest('Failed to delete department');
  }
  res.status(200).json({ ...result });
};

export default deleteDepartmentController;
