import { Router } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';

import uploadDocumentController from './createDocument.controller';
import { authenticateToken } from '../../middlewares/authenticateToken';

const documentRouter = Router();
const { catchAsync } = new ErrorHandler();

documentRouter.use(catchAsync(authenticateToken));
documentRouter.post('/upload-photo', uploadDocumentController);

export default documentRouter;
