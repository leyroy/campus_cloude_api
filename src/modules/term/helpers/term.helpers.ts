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
  public async getTermBySchoolId(id: string, shcoolId: string) {
    return await prisma.term.findFirst({ where: { id, schoolId: shcoolId } });
  }
  public async getAllTermsBySchoolId(id: string, shcoolId: string) {
    return await prisma.term.findMany({ where: { id, schoolId: shcoolId } });
  }
}
