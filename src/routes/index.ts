import express from 'express';

const appRouter = express.Router();
import userRouter from './users';
import roleRouter from './role/routes';

appRouter.use('/users', userRouter);
appRouter.use("/roles",roleRouter)

export default appRouter;
