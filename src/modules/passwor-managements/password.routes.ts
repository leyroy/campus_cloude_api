import { Router } from 'express';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';
import { ErrorHandler } from '../../middlewares/errorHandler';

const passwordRoutes = Router();
const errorHandler = new ErrorHandler();

passwordRoutes.post('/forgot-password', errorHandler.catchAsync(forgotPassword));
passwordRoutes.post('/reset-password', errorHandler.catchAsync(resetPassword));

export default passwordRoutes;
