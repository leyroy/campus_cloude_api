import { Router } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import zodValidator from '../../middlewares/zodValidator';
import { SchoolConfigurationSchema } from './types';
import configureSchool from './controllers/create.controller';
import deleteSchool from './controllers/delete.controller';
import updateSchool from './controllers/update.controller';
import { validatePayload } from '../../middlewares/validate-payload';
import { Action, Resource, TABELS_NAMES_ENUM } from '../../types/types';
import permissionHandler from '../../middlewares/permissionsManager';
const schoolRouter = Router();

const { catchAsync } = new ErrorHandler();

//middlewares configuration
schoolRouter.use(catchAsync(authenticateToken));

schoolRouter.post(
  '/configure',
  zodValidator(SchoolConfigurationSchema),
  // catchAsync(permissionHandler({ action: Action.CREATE, resource: Resource.SCHOOL })),
  catchAsync(configureSchool)
);
schoolRouter.put(
  '/:schoolId',
  validatePayload(TABELS_NAMES_ENUM.SCHOOL),
  catchAsync(permissionHandler({ action: Action.UPDATE, resource: Resource.SCHOOL })),
  catchAsync(updateSchool)
);
schoolRouter.delete(
  '/:schoolId',
  catchAsync(permissionHandler({ action: Action.DELETE, resource: Resource.SCHOOL })),
  catchAsync(deleteSchool)
);

export default schoolRouter;
