import { Router } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { validatePayload } from '../../middlewares/validate-payload';
import { TABELS_NAMES_ENUM } from '../../types/types';
import configureSchoole from './controllers/create.controller';
const schoolRouter = Router();

const { catchAsync } = new ErrorHandler();

//middlewares configuration
schoolRouter.use(catchAsync(authenticateToken));

schoolRouter.post(
  '/',
  validatePayload(TABELS_NAMES_ENUM.SCHOOL_PROFILE),
  catchAsync(configureSchoole)
);
