import epress from 'express';
import loginController from '../../modules/auth/loginController';
import { logoutController } from '../../modules/auth/logout';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import signUpController from '../../modules/auth/signupcontroller';

const authRouter = epress.Router();

const errorHandler = new ErrorHandler();
authRouter.post('/signup', errorHandler.catchAsync(signUpController));

/**
 * @swagger
 * /campcloud/api/v1/auth:
 *   get:
 *     tags: [Authentication]
 *     summary: Sign in with email or phone and password
 *     description: Login in with your credential(email/phone & password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *               phone:
 *                 type: string
 *                 format: phone
 *                 example: "+2335567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Yourpassword@123"
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoginResponse'
 */
authRouter.get('/', errorHandler.catchAsync(loginController));

authRouter.use(authenticateToken);

/**
 * @swagger
 * /campcloud/api/v1/auth/logout:
 *   get:
 *     tags: [Authentication]
 *     summary: Logout user
 *     description: Logout the user by clearing the access and refresh tokens.
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 */
authRouter.get('/logout', errorHandler.catchAsync(logoutController));

export default authRouter;
