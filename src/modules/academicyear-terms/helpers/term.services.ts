import { Term } from '@prisma/client';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { CreateTermType } from '../types';
import { TermHelpers } from './term.helpers';

export class TermService {
  private termHelpers: TermHelpers;
  constructor(termHelpers: TermHelpers) {
    this.termHelpers = termHelpers;
  }
  public async createTerm(term: CreateTermType & { schoolId: string; userId: string }) {
    const newTerm = await this.termHelpers.createTerm(term);
    if (!newTerm) {
      return ErrorHandler.badRequest();
    }
    return {
      message: 'term created sucessfully',
      success: true,
    };
  }

  public async updateTerm({ id, data }: { id: string; data: Partial<Term> }) {
    const updatedTerm = await this.termHelpers.updateTerm({ id, data });
    return {
      success: true,
      message: 'Updated successfully',
      data: updatedTerm,
    };
  }
  public async getSchoolAcademicYears(schoolId: string) {
    const updatedTerm = await this.termHelpers.getSchoolAcademicYears(schoolId);
    return {
      success: true,
      message: 'Updated successfully',
      data: updatedTerm,
    };
  }
  //delete term
  public async deleteTerm(id: string) {
    await this.termHelpers.deleteTerm(id);
    return {
      success: true,
      message: 'Deleted successfully',
    };
  }
  //get term by school id
  public async getTermByTermId(id: string) {
    const term = await this.termHelpers.getTermByTermId(id);
    if (!term) {
      return ErrorHandler.notFound();
    }
    return {
      success: true,
      message: 'term',
      data: term,
    };
  }
  //get all terms for a school
  public async getAllTermsBySchoolId(schoolId: string) {
    const terms = await this.termHelpers.getAllTermsBySchoolId(schoolId);
    return {
      success: true,
      message: 'terms',
      data: terms,
    };
  }
}

export const termService = new TermService(new TermHelpers());
