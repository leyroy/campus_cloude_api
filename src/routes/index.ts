import express from 'express';

const appRouter = express.Router();
import userRouter from './users';
import roleRouter from './role/routes';
import authRouter from './auth';

appRouter.use('/users', userRouter);
appRouter.use("/roles",roleRouter)
appRouter.use("/auth", authRouter)

export default appRouter;
