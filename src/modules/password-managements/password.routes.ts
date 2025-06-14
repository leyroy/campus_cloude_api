import { Router } from 'express';
import resetPassword from './resetPassword.controller';
import forgotPassword from './forgotPassword.controller';
import { ErrorHandler } from '../../middlewares/errorHandler';
import changePasswordController from './changPassword.controller';
import { authenticateToken } from '../../middlewares/authenticateToken';

const passwordRoutes = Router();
const errorHandler = new ErrorHandler();

passwordRoutes.use(errorHandler.catchAsync(authenticateToken));

passwordRoutes.get('/forgot-password', errorHandler.catchAsync(forgotPassword));
passwordRoutes.put('/reset-password', errorHandler.catchAsync(resetPassword));
passwordRoutes.put('/change-password', errorHandler.catchAsync(changePasswordController));

export default passwordRoutes;
