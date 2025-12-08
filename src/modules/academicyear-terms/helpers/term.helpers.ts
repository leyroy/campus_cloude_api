import { Term } from '@prisma/client';
import prisma from '../../../config/prisma.config';

export class TermHelpers {
  public async createTerm(term: Omit<Term, 'id' | 'createdAt' | 'updatedAt'>) {
    return await prisma.term.create({ data: term });
  }

  public async updateTerm({ id, data }: { id: string; data: Partial<Term> }) {
    return await prisma.term.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  public async deleteTerm(id: string) {
    return await prisma.term.delete({ where: { id } });
  }
  public async getTermByTermId(id: string) {
    return await prisma.term.findFirst({
      where: { id },
      include: {
        academicYear: true,
        school: true,
        Subject: true,
      },
    });
  }
  public async getAllTermsBySchoolId(shcoolId: string) {
    return await prisma.term.findMany({ where: { schoolId: shcoolId } });
  }
  public async getSchoolAcademicYears(schoolId: string) {
    return await prisma.term.findMany({ where: { schoolId: schoolId } });
  }
}
