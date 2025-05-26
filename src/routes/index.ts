import express from 'express';
import { ErrorHandler } from '../libs/utils/errorHandler';

const errorHandler = new ErrorHandler();

const appRouter = express.Router();
import userRouter from './users';


appRouter.use('/users', errorHandler.catchAsync(userRouter));

export default appRouter;
