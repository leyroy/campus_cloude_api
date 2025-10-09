import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ErrorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
// Import routes
import appRouter from './routes';
import prisma from './config/prisma.config';
// import { commonDbService } from './utils/db/commonDbServices';
import cors from 'cors';
import dotenv from 'dotenv';
import specs from './config/swagger.config';
const app = express();
const PORT = process.env.PORT || 5000;

const errorHandler = new ErrorHandler();

//Middlware configuration
app.use(express.json());
//TODO: add more cookie parser options for security
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
dotenv.config();
errorHandler.setupGlobalHandlers();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/campcloud/api/v1', appRouter);
app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express server!' });
});
// commonDbService.assignAllPermissionsToSuperAdmin('450181ee-a730-4728-a1df-0b1f8e31f306');

app.use(errorHandler.handleError);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
