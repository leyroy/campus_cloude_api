import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { ErrorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
// Import routes
import appRouter from './routes';
import prisma from './config/prisma.config';
import cors from 'cors';
import dotenv from 'dotenv';
import specs from './config/swagger.config';
import { commonDbService } from './utils/db/commonDbServices';
const app = express();
const PORT = process.env.PORT || 5000;

const errorHandler = new ErrorHandler();

//Middlware configuration
app.use(express.json());
//TODO: add more cookie parser options for security
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://campus-cloude.vercel.app', 'http://localhost:3000'],
    credentials: true,
  })
);
dotenv.config();
errorHandler.setupGlobalHandlers();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/campcloud/api/v1', appRouter);
app.get(
  '/campcloud/api/v1/create-admin-role',
  (req: Request, res: Response, next: NextFunction) => {
    commonDbService
      .assignAllPermissionsToSuperAdmin()
      .then(() => {
        res.status(201).json({ message: 'Admin role created successfully' });
      })
      .catch((error: unknown) => {
        next(error);
      });
  }
);
app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express server!' });
});

app.use(errorHandler.handleError);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
