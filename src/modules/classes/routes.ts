import { Router } from 'express';
import createClassController from './controllers/createClass.controller';

const classRouter = Router();

classRouter.post('/', createClassController);

export default classRouter;
