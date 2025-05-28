/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique user identifier
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: strongpassword123
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: strongpassword123
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *           example: 2024-12-25T12:34:56Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 *           example: 2025-01-01T08:00:00Z
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - confirmPassword
 *         - isActive
 *         - phone
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: strongpassword123
 *         confirmPassword:
 *           type: string
 *           format: password
 *           example: strongpassword123
 *         isActive:
 *           type: boolean
 *           description: Indicates if the user is active
 *           example: true
 *         phone:
 *           type: string
 *           format: phone
 *           example: +1234567890
 */
