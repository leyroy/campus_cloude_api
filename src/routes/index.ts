import express from 'express';

import userRouter from '../modules/users';
import roleRouter from '../modules/roles/routes';
import authRouter from '../modules/auth/routes';
import passwordRoutes from '../modules/password-managements/password.routes';
import schoolRouter from '../modules/school-configuration/routes';

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/users', userRouter);
appRouter.use('/roles', roleRouter);
appRouter.use('/password', passwordRoutes);
appRouter.use('/school-config', schoolRouter);

export default appRouter;
