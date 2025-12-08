import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../../types/types';
import { termService, TermService } from './helpers/term.services';
import { CreateTermType } from './types';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { HTTPSTATUS } from '../../constants/http-status';

class TermControllersServices {
  private termServices: TermService;
  constructor(termServices: TermService) {
    this.termServices = termServices;
  }
  //create term controller
  public create = async (req: Request, res: Response) => {
    const { schoolId, userId } = (req as CustomRequest).user;
    const termData = req.body as CreateTermType;
    if (!schoolId || !userId) {
      throw ErrorHandler.unauthorized();
    }
    const term = this.termServices.createTerm({
      ...termData,
      schoolId: schoolId,
      userId: userId,
    });
    res.status(200).json(term);
  };
  //update term controller
  public update = async (req: Request, res: Response, next: NextFunction) => {
    const { schoolId, userId } = (req as CustomRequest).user;
    const termData = req.body as CreateTermType;
    const { id } = req.params;
    if (!schoolId || !userId || id) {
      throw ErrorHandler.unauthorized();
    }
    const updatedTerm = await this.termServices.updateTerm({ id, data: termData });
    res.status(HTTPSTATUS.OK).json({
      ...updatedTerm,
    });
  };
  //function to retrieve all terms by school id
  public delete = async (req: Request, res: Response) => {
    const { schoolId, userId } = (req as CustomRequest).user;
    const { id } = req.params;
    if (!schoolId || !userId || id) {
      throw ErrorHandler.unauthorized();
    }
    const deletedTerm = await this.termServices.deleteTerm(id);
    res.status(HTTPSTATUS.ACCEPTED).json({
      ...deletedTerm,
    });
  };
  //TODO:
  public getTermByTermId = async (req: Request, res: Response) => {
    const { schoolId, userId } = (req as CustomRequest).user;
    const { id } = req.params;
    if (!schoolId || !userId || id) {
      throw ErrorHandler.unauthorized();
    }
    const term = await this.termServices.getTermByTermId(id);
    res.status(HTTPSTATUS.ACCEPTED).json({
      ...term,
    });
  };
  //all terms by school id
  public getAllTermsBySchoolId = async (req: Request, res: Response) => {
    const { schoolId, userId } = (req as CustomRequest).user;
    const { id } = req.params;
    if (!schoolId || !userId || id) {
      throw ErrorHandler.unauthorized();
    }
    const terms = await this.termServices.getAllTermsBySchoolId(schoolId);
    res.status(HTTPSTATUS.OK).json({
      success: true,
      term: terms?.data || [],
    });
  };
}

export const termControllers = new TermControllersServices(termService);
