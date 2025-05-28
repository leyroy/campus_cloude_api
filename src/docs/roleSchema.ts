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
 *         description:
 *           type: string
 *           example: Administrator role with full access
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: [ "read", "write", "delete" ]
 */ 

/**
 * @openapi
 * components:
 *   schemas:
 *     RoleRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - permissions
 *       properties:
 *         name:
 *           type: string
 *           example: Admin
 *         description:
 *           type: string
 *           example: Administrator role with full access
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: [ "read", "write", "delete" ]
 */ 