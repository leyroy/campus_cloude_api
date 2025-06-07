import express from 'express';

const appRouter = express.Router();
import userRouter from './users';
import roleRouter from './role/routes';
import authRouter from './auth';
import passwordRoutes from '../modules/passwor-managements/password.routes';

appRouter.use('/users', userRouter);
appRouter.use('/roles', roleRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/auth/password', passwordRoutes);

export default appRouter;
