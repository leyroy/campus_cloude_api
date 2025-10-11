import { Router } from 'express';
import resetPassword from './resetPassword.controller';
import forgotPassword from './forgotPassword.controller';
import { ErrorHandler } from '../../middlewares/errorHandler';
import changePasswordController from './changPassword.controller';
import { authenticateToken } from '../../middlewares/authenticateToken';

const passwordRoutes = Router();
const errorHandler = new ErrorHandler();

passwordRoutes.post('/forgot-password', errorHandler.catchAsync(forgotPassword));
passwordRoutes.put('/reset-password/:token', errorHandler.catchAsync(resetPassword));
passwordRoutes.use(errorHandler.catchAsync(authenticateToken));
passwordRoutes.put('/change-password', errorHandler.catchAsync(changePasswordController));

export default passwordRoutes;
