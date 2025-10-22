import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { studentServices } from './student.services';

const updateGauirdian = async (req: Request, res: Response, next: NextFunction) => {
  const { gauirdianId } = req.params as { gauirdianId: string };
  const data = req.body;
  try {
    if (!gauirdianId) {
      throw ErrorHandler.forbidden('This action connot be completed');
    }
    const result = await studentServices.updateGauidian(gauirdianId, data);

    res
      .status(200)
      .json({ success: true, message: 'Updated successfully', modelId: result.id });
  } catch (err) {
    next(err);
  }
};

export default updateGauirdian;
