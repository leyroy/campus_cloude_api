import epress from 'express';
import loginController from '../../modules/auth/loginController';
import { logoutController } from '../../modules/auth/logout';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';

const authRouter = epress.Router();

const errorHandler = new ErrorHandler();

/**
 * @swagger
 * /campcloud/api/v1/roles:
 *   get:
 *     tags: [Authentication]
 *     summary: Sign in with email or password
 *     description: Login in with your credential(email/phone & password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Logged in succeffully.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoginResponse'
 */
authRouter.get("/", errorHandler.catchAsync(loginController));
authRouter.use(authenticateToken)
authRouter.get("/logout", errorHandler.catchAsync(logoutController));

export default authRouter;