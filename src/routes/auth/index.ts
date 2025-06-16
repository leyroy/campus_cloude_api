import epress from 'express';
import loginController from '../../modules/auth/loginController';
import { logoutController } from '../../modules/auth/logout.controller';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import signUpController from '../../modules/auth/signupcontroller';
import verifyEmailController from '../../modules/auth/verifyEmail.controller';
import zodValidator from '../../middlewares/zodValidator';
import { RegisterSchema } from '../../modules/auth/auth.validator';
import { validatePayload } from '../../middlewares/validate-payload';
import { TABELS_NAMES_ENUM } from '../../types/types';

const authRouter = epress.Router();

/**
 * @swagger
 * /campcloud/api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign up with email or phone and password
 *     description: Create a new account with your credentials (email/phone & password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: registration successful
 */
const errorHandler = new ErrorHandler();
authRouter.post(
  '/signup',
  validatePayload(TABELS_NAMES_ENUM.USERS),
  zodValidator(RegisterSchema),
  errorHandler.catchAsync(signUpController)
);

/**
 * @swagger
 * /campcloud/api/v1/auth:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in with email or phone and password
 *     description: Login with your credentials (email/phone & password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 */

authRouter.post('/', errorHandler.catchAsync(loginController));

// authRouter.use(errorHandler.catchAsync(authenticateToken));

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
authRouter.get('/logout', authenticateToken, errorHandler.catchAsync(logoutController));

/**
 * @swagger
 * /campcloud/api/v1/auth/verify-email:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Verify user email
 *     description: Verify the user's email address using a verification token.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         description: The verification token sent to the user's email.
 *         schema:
 *           type: string
 *           example: "verification_token_example"
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email verified successfully.
 *       400:
 *         description: Bad Request - Invalid or expired token.
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request.
 */

authRouter.get('/verify-email', errorHandler.catchAsync(verifyEmailController));

export default authRouter;
