import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../../types/types';
import { CreateTermType } from '../types';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { termService } from '../helpers/term.services';

const createTermController = async (req: Request, res: Response, next: NextFunction) => {
  const { schoolId, userId } = (req as CustomRequest).user;
  const termData = req.body as CreateTermType;
  if (!schoolId || !userId) {
    throw ErrorHandler.unauthorized();
  }
  try {
    const term = termService.createTerm({
      ...termData,
      schoolId: schoolId,
      userId: userId,
    });
    res.status(200).json(term);
  } catch (err) {
    next(err);
  }
};

export default createTermController;
