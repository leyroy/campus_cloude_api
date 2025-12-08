import { Router } from 'express';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { ErrorHandler } from '../../middlewares/errorHandler';
import zodValidator from '../../middlewares/zodValidator';
import { CreateTermSchema } from './types';
import { Action, Resource, TABELS_NAMES_ENUM } from '../../types/types';
import { validatePayload } from '../../middlewares/validate-payload';
import { termControllers } from './term.services.cotroller';
import permissionHandler from '../../middlewares/permissionsManager';
import { academicYearSchema } from './type';
import listSchoolAcademicYearsController from './controllers/getSchoolAcademicYears.Controller';
import createAcademicYearController from './controllers/createAcademicYear.controller';

const termRoutes = Router();
const { catchAsync } = new ErrorHandler();
termRoutes.use(catchAsync(authenticateToken));

termRoutes.post(
  '/',
  catchAsync(
    permissionHandler({
      resource: Resource.TERM,
      action: Action.CREATE,
    })
  ),
  validatePayload(TABELS_NAMES_ENUM.TERM),
  zodValidator(CreateTermSchema),
  catchAsync(termControllers.create)
);
termRoutes.post(
  '/create',
  zodValidator(academicYearSchema),
  catchAsync(createAcademicYearController)
);
termRoutes.put(
  `/update/:id`,
  permissionHandler({
    resource: Resource.TERM,
    action: Action.UPDATE,
  }),
  validatePayload(TABELS_NAMES_ENUM.TERM),

  zodValidator(CreateTermSchema),
  catchAsync(termControllers.update)
);
termRoutes.delete(`/delete/:id`, catchAsync(termControllers.delete));
termRoutes.get(`/term/:id`, catchAsync(termControllers.getTermByTermId));
//
termRoutes.get(
  `/get_terms_by_school_id/:id`,
  permissionHandler({
    resource: Resource.TERM,
    action: Action.VIEW,
  }),
  catchAsync(termControllers.getAllTermsBySchoolId)
);
termRoutes.get(
  '/list-school-academic-years/:schoolId',
  zodValidator(academicYearSchema),
  catchAsync(listSchoolAcademicYearsController)
);

export default termRoutes;
