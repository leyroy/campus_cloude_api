import { Router } from 'express';
import createStudentController from './createStudent.controller';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { validatePayload } from '../../middlewares/validate-payload';
import { Action, Resource, TABELS_NAMES_ENUM } from '../../types/types';
import zodValidator from '../../middlewares/zodValidator';
import permissionHandler from '../../middlewares/permissionsManager';
import getStudentsBySchoolId from './getSudentsBySchoolId.controller';
import updateStuent from './updateStudent.controller';
import deleteStudent from './deleteStudent.controller';
import { combindedStudentGuardianSchema, guardianSchema, studentSchema } from './types';
import updateGaurdian from './updataGaurdian.controller';

const studentRouter = Router();

const { catchAsync } = new ErrorHandler();

studentRouter.use(catchAsync(authenticateToken));
studentRouter.post(
  '/create-student',
  validatePayload(TABELS_NAMES_ENUM.STUDENT),
  zodValidator(combindedStudentGuardianSchema),
  permissionHandler({ action: Action.CREATE, resource: Resource.STUDENT }),
  catchAsync(createStudentController)
);

studentRouter.get(
  '/get-by-school',
  permissionHandler({ action: Action.VIEW, resource: Resource.STUDENT }),
  catchAsync(getStudentsBySchoolId)
);
studentRouter.put(
  '/update-student',
  validatePayload(TABELS_NAMES_ENUM.STUDENT),
  zodValidator(studentSchema),
  permissionHandler({ action: Action.UPDATE, resource: Resource.STUDENT }),
  catchAsync(updateStuent)
);
studentRouter.put(
  '/update-guardian',
  validatePayload(TABELS_NAMES_ENUM.GAUIDIAN),
  zodValidator(guardianSchema),
  permissionHandler({ action: Action.UPDATE, resource: Resource.GAUIDIAN }),
  catchAsync(updateGaurdian)
);
studentRouter.delete(
  '/update-student',
  permissionHandler({ action: Action.DELETE, resource: Resource.STUDENT }),
  catchAsync(deleteStudent)
);

export default studentRouter;
