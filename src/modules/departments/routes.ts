import { Router } from 'express';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { validatePayload } from '../../middlewares/validate-payload';
import { Action, Resource, TABELS_NAMES_ENUM } from '../../types/types';
import permissionHandler from '../../middlewares/permissionsManager';
import createDepartmentController from './controllers/createDepartment.controller';
import updateDepartmentController from './controllers/updateDepartment.controller';
import zodValidator from '../../middlewares/zodValidator';
import { CreateDepartmentSchema } from './types';
import getDepartmentById from './controllers/getDepartmentId.controller';
import getDepartmentBySchoolId from './controllers/getDepartmentsBySchoolId.controller';
import deleteDepartmentController from './controllers/deleteDepartment.controller';

const departmentRouter = Router();
const { catchAsync } = new ErrorHandler();

departmentRouter.use(authenticateToken);
departmentRouter.post(
  '/',
  validatePayload(TABELS_NAMES_ENUM.DEPARTMENT),
  zodValidator(CreateDepartmentSchema),
  catchAsync(
    permissionHandler({
      resource: Resource.DEPARTMENT,
      action: Action.CREATE,
    })
  ),
  catchAsync(createDepartmentController)
);

departmentRouter.put(
  '/:departmentId',
  validatePayload(TABELS_NAMES_ENUM.DEPARTMENT),
  zodValidator(CreateDepartmentSchema),
  catchAsync(
    permissionHandler({
      resource: Resource.DEPARTMENT,
      action: Action.UPDATE,
    })
  ),
  catchAsync(updateDepartmentController)
);
departmentRouter.get(
  '/:departmentId',
  catchAsync(
    permissionHandler({
      resource: Resource.DEPARTMENT,
      action: Action.VIEW,
    })
  ),
  catchAsync(getDepartmentById)
);

departmentRouter.get(
  '/school',
  catchAsync(
    permissionHandler({
      action: Action.VIEW,
      resource: Resource.DEPARTMENT,
    })
  ),
  catchAsync(getDepartmentBySchoolId)
);
departmentRouter.delete(
  '/:deparmentId',
  catchAsync(
    permissionHandler({
      action: Action.VIEW,
      resource: Resource.DEPARTMENT,
    })
  ),
  catchAsync(deleteDepartmentController)
);

export default departmentRouter;
