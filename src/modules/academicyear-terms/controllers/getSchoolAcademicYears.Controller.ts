import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../../types/types';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { termService } from '../helpers/term.services';

const listSchoolAcademicYearsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schoolId = (req as CustomRequest)?.user?.schoolId;
  try {
    if (!schoolId) {
      throw ErrorHandler.badRequest('School ID is required');
    }
    const results = await termService.getSchoolAcademicYears(schoolId);
    res
      .status(200)
      .json({ message: 'listSchoolAcademicYearsController controller is live 🧨' });
  } catch (err) {
    next(err);
  }
};

export default listSchoolAcademicYearsController;
