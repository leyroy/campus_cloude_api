import prisma from '../../../config/prisma.config';
import { CreateClassInput } from '../types';

export class ClassHelpers {
  public async createClass(
    data: CreateClassInput & { createdById: string; schoolId: string }
  ) {
    return await prisma.class.create({ data: { ...data } });
  }

  public async updateClass(
    data: Partial<CreateClassInput> & { updatedById: string },
    classId: string
  ) {
    return await prisma.class.update({
      where: { id: classId },
      data: { ...data },
    });
  }
  public async deleteClass(classId: string) {
    return await prisma.class.delete({
      where: { id: classId },
    });
  }
  public async getClassById(classId: string) {
    return await prisma.class.findUnique({
      where: { id: classId },
      include: {
        department: true,
        students: {
          select: {
            id: true,
            indexNumber: true,
            firstName: true,
            lastName: true,
            studentGuardians: {
              select: {
                fullName: true,
                id: true,
                relationship: true,
                phone: true,
              },
            },
          },
        },
      },
    });
  }
  public async getClassesBySchoolId(schoolId: string) {
    return await prisma.class.findMany({
      where: { schoolId },
      include: {
        department: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }
  public async listAllClasses() {
    return await prisma.class.findMany();
  }
}
