/**
 * @openapi
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - permissions
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique user identifier
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           example: Admin
 *         createdById:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174001
 *         description:
 *           type: string
 *           example: Administrator role with full access
 *
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     AddRoleToPermissionsRequest:
 *       type: object
 *       required:
 *         - roleId
 *         - permissions
 *       properties:
 *         roleId:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         permissions:
 *           type: array
 *           items:
 *             type: object
 *             example: [ "permission1", "permission2", "permission3" ]
 */ 


/**
 * @openapi
 * components:
 *   schemas:
 *     AssignRoleRequest:
 *       type: object
 *       required:
 *         - userId
 *         - roleId
 *         - assignedById
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Unique user identifier
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         roleId:
 *           type: string
 *           format: uuid
 *           description: Unique role identifier
 *           example: 123e4567-e89b-12d3-a456-426614174001
 *         assignedById:
 *           type: string
 *           format: uuid
 *           description: Unique identifier of the user assigning the role
 *           example: 123e4567-e89b-12d3-a456-426614174002
 */
