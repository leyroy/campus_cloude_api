import { Router } from 'express';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { ErrorHandler } from '../../middlewares/errorHandler';
import createAcademicYearController from './controllers/createAcademicYear.controller';
import zodValidator from '../../middlewares/zodValidator';
import { academicYearSchema } from './type';
import listSchoolAcademicYearsController from './controllers/getSchoolAcademicYears.Controller';
const accademicYearRoutes = Router();

const { catchAsync } = new ErrorHandler();

accademicYearRoutes.use(catchAsync(authenticateToken));

accademicYearRoutes.post(
  '/create',
  zodValidator(academicYearSchema),
  catchAsync(createAcademicYearController)
);
accademicYearRoutes.get(
  '/list-school-academic-years/:schoolId',
  zodValidator(academicYearSchema),
  catchAsync(listSchoolAcademicYearsController)
);

export default accademicYearRoutes;
