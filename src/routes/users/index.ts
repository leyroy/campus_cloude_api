import express from 'express';

const usersRouter = express.Router();


/**
 * @swagger
 * /campcloud/api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       404:
 *         description: Users not found.
 */


usersRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Users API!' });
});

export default usersRouter;