import { Router } from 'express';
import { authenticateToken } from '../../middlewares/authenticateToken';
import { ErrorHandler } from '../../middlewares/errorHandler';
import zodValidator from '../../middlewares/zodValidator';
import { CreateTermSchema } from './types';
import { TABELS_NAMES_ENUM } from '../../types/types';
import { validatePayload } from '../../middlewares/validate-payload';
import { termControllers } from './term.services.cotroller';

const termRoutes = Router();
const { catchAsync } = new ErrorHandler();
termRoutes.use(catchAsync(authenticateToken));

termRoutes.post(
  '/',
  validatePayload(TABELS_NAMES_ENUM.TERM),
  zodValidator(CreateTermSchema),
  catchAsync(termControllers.create)
);
termRoutes.put(
  `/updaate/:id`,
  validatePayload(TABELS_NAMES_ENUM.TERM),
  zodValidator(CreateTermSchema),
  catchAsync(termControllers.update)
);
termRoutes.delete(`/:id`, catchAsync(termControllers.delete));
termRoutes.get(
  `/get_term_by_school_id/:id`,
  catchAsync(termControllers.getTermBySchoolId)
);
//
termRoutes.get(
  `/get_all_term_by_school_id/:id`,
  catchAsync(termControllers.getAllTermsBySchoolId)
);

export default termRoutes;
