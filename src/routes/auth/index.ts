import epress from 'express';
import loginController from '../../modules/auth/loginController';
import { logoutController } from '../../modules/auth/logout';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';

const authRouter = epress.Router();

const errorHandler = new ErrorHandler();

authRouter.get("/", errorHandler.catchAsync(loginController));
authRouter.use(authenticateToken)
authRouter.get("/logout", errorHandler.catchAsync(logoutController));

export default authRouter;