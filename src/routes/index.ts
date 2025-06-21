import express from 'express';

const appRouter = express.Router();
import userRouter from '../modules/users';
import roleRouter from '../modules/roles/routes';
import authRouter from '../modules/auth/routes';
import passwordRoutes from '../modules/password-managements/password.routes';
import schoolRouter from '../modules/school-configuration/routes';

appRouter.use('/users', userRouter);
appRouter.use('/roles', roleRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/password', passwordRoutes);
appRouter.use('/school-config', schoolRouter);

export default appRouter;
