import prisma from '../../../config/prisma.config';

export class SchoolHepers {
  public async getSchoolBySchoolId(schoolId: string) {
    const school = await prisma.school.findUnique({ where: { id: schoolId } });
  }
  public async getSchoolOwnerId(ownerId: string) {
    // const school = await prisma.ownersSchool.findFirst({ where: { ownerId: ownerId } });
  }
}

export const schoolHelpers = new SchoolHepers();
