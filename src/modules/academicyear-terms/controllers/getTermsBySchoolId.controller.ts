import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { CustomRequest } from '../../../types/types';
import { termService } from '../helpers/term.services';

const getTermsBySchoolIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { schooleId } = req.params;
  const user = (req as CustomRequest)?.user;
  try {
    // 🎯 Handle getTermsBySchooleIdController logic here neger 😎
    if (!schooleId) {
      throw ErrorHandler.badRequest('School ID is required');
    }
    if (!user || user?.schoolId !== schooleId) {
      throw ErrorHandler.unauthorized();
    }
    const terms = await termService.getAllTermsBySchoolId(schooleId);
    res.status(200).json({ success: true, terms: terms || [] });
  } catch (err) {
    next(err);
  }
};

export default getTermsBySchoolIdController;
