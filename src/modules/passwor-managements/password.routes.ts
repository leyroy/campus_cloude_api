import { Router } from 'express';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';
import { ErrorHandler } from '../../middlewares/errorHandler';

const passwordRoutes = Router();
const errorHandler = new ErrorHandler();

passwordRoutes.get('/forgot-password', errorHandler.catchAsync(forgotPassword));
passwordRoutes.put('/reset-password', errorHandler.catchAsync(resetPassword));

export default passwordRoutes;
