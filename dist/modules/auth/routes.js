"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("./loginController"));
const logout_controller_1 = require("./logout.controller");
const errorHandler_1 = require("../../middlewares/errorHandler");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const signupcontroller_1 = __importDefault(require("./signupcontroller"));
const verifyEmail_controller_1 = __importDefault(require("./verifyEmail.controller"));
const zodValidator_1 = __importDefault(require("../../middlewares/zodValidator"));
const auth_validator_1 = require("./auth.validator");
const validate_payload_1 = require("../../middlewares/validate-payload");
const types_1 = require("../../types/types");
const getAuthUserProfile_controller_1 = __importDefault(require("../users/controllers/getAuthUserProfile.controller"));
const authRouter = express_1.default.Router();
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
const errorHandler = new errorHandler_1.ErrorHandler();
authRouter.post('/signup', (0, validate_payload_1.validatePayload)(types_1.TABELS_NAMES_ENUM.USERS), (0, zodValidator_1.default)(auth_validator_1.RegisterSchema), errorHandler.catchAsync(signupcontroller_1.default));
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
authRouter.post('/login', errorHandler.catchAsync(loginController_1.default));
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
authRouter.get('/logout', authenticateToken_1.authenticateToken, errorHandler.catchAsync(logout_controller_1.logoutController));
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
authRouter.post('/verify-email', errorHandler.catchAsync(verifyEmail_controller_1.default));
authRouter.use(errorHandler.catchAsync(authenticateToken_1.authenticateToken));
authRouter.get('/auth-profile', errorHandler.catchAsync(getAuthUserProfile_controller_1.default));
exports.default = authRouter;
