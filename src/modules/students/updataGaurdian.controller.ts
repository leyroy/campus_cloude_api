import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { studentServices } from './student.services';

const updateGaurdian = async (req: Request, res: Response, next: NextFunction) => {
  const { gaurdianId } = req.params as { gaurdianId: string };
  const data = req.body;
  try {
    if (!gaurdianId) {
      throw ErrorHandler.forbidden('This action connot be completed');
    }
    const result = await studentServices.updateGaurdian(gaurdianId, data);

    res
      .status(200)
      .json({ success: true, message: 'Updated successfully', modelId: result.id });
  } catch (err) {
    next(err);
  }
};

export default updateGaurdian;
