import { Router } from 'express';
import createClassController from './controllers/createClass.controller';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { validatePayload } from '../../middlewares/validate-payload';
import zodValidator from '../../middlewares/zodValidator';
import { createClassSchema } from './types';
import { Action, Resource, TABELS_NAMES_ENUM } from '../../types/types';
import permissionHandler from '../../middlewares/permissionsManager';
import updateClassController from './controllers/updateClass.controller';
import getAllClassesController from './controllers/getAllClasses.controller';
import getClassesBySchooleController from './controllers/listClassesBySchoole.controller';
import deleteClassController from './controllers/deleteClass.controller';
import getClassDetailByClassIdController from './controllers/getClassDetails.controller';

const classRouter = Router();
const { catchAsync } = new ErrorHandler();
classRouter.use(catchAsync(authenticateToken));

classRouter.post(
  '/new-class',
  catchAsync(permissionHandler({ action: Action.CREATE, resource: Resource.CLASS })),
  validatePayload(TABELS_NAMES_ENUM.CLASS),
  zodValidator(createClassSchema),
  catchAsync(createClassController)
);
classRouter.put(
  '/update-cleass/:classId',
  catchAsync(permissionHandler({ action: Action.UPDATE, resource: Resource.CLASS })),
  validatePayload(TABELS_NAMES_ENUM.CLASS),
  zodValidator(createClassSchema),
  catchAsync(updateClassController)
);
classRouter.get(
  '/get-all-classes',
  catchAsync(permissionHandler({ action: Action.VIEW, resource: Resource.CLASS })),
  catchAsync(getAllClassesController)
);
classRouter.get(
  '/list-by-school/:schoolId',
  catchAsync(permissionHandler({ action: Action.VIEW, resource: Resource.CLASS })),
  catchAsync(getClassesBySchooleController)
);
classRouter.delete(
  '/get-class-details/:classId',
  catchAsync(permissionHandler({ action: Action.VIEW, resource: Resource.CLASS })),
  catchAsync(getClassDetailByClassIdController)
);
classRouter.delete(
  '/delete/:classId',
  catchAsync(permissionHandler({ action: Action.DELETE, resource: Resource.CLASS })),
  catchAsync(deleteClassController)
);

export default classRouter;
