import { Router } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import zodValidator from '../../middlewares/zodValidator';
import { SchoolConfigurationSchema } from './types';
import configureSchool from './controllers/create.controller';
const schoolRouter = Router();

const { catchAsync } = new ErrorHandler();

//middlewares configuration
schoolRouter.use(catchAsync(authenticateToken));

schoolRouter.post('/', zodValidator(SchoolConfigurationSchema), catchAsync(configureSchool));
