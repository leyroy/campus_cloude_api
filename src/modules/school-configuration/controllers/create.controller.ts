import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../../types/types';
import { CreateSchoolConfigurationDto } from '../types';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import schoolServices from '../services/schoolServices';
import { HTTPSTATUS } from '../../../constants/http-status';

const configureSchool = async (req: Request, res: Response, next: NextFunction) => {
  const { schoolProfile, owner, schoolAddress } =
    req.body as CreateSchoolConfigurationDto;
  const { userId } = (req as CustomRequest)?.user;
  if (!userId) {
    throw ErrorHandler.unauthorized('User not authenticated');
  }
  const result = await schoolServices.createSchoolProfile(
    {
      schoolProfile,
      owner,
      schoolAddress,
    },
    userId
  );

  if (!result) {
    throw ErrorHandler.internal('Failed to create school configuration');
  }
  res.status(HTTPSTATUS.CREATED).json(result);
};

export default configureSchool;
