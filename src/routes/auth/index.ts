import epress from 'express';
import loginController from '../../modules/auth/loginController';
import { logoutController } from '../../modules/auth/logout';
import { ErrorHandler } from '../../middlewares/errorHandler';

const authRouter = epress.Router();

const errorHandler = new ErrorHandler();

authRouter.get("/", errorHandler.catchAsync(loginController));
authRouter.get("/logout", errorHandler.catchAsync(logoutController));

export default authRouter;