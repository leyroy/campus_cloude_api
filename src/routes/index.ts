import express from 'express';

import userRouter from '../modules/users';
import roleRouter from '../modules/roles/routes';
import authRouter from '../modules/auth/routes';
import passwordRoutes from '../modules/password-managements/password.routes';
import schoolRouter from '../modules/school-configuration/routes';
import documentRouter from '../modules/document/routes';

const appRouter = express.Router();

appRouter.use('/auth', authRouter);
appRouter.use('/users', userRouter);
appRouter.use('/roles', roleRouter);
appRouter.use('/password', passwordRoutes);
appRouter.use('/school', schoolRouter);
appRouter.use('/document', documentRouter);

export default appRouter;
