import { Department } from '@prisma/client';
import prisma from '../../../config/prisma.config';

export class DepartmentHelpers {
  public createDepartment(data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.department.create({ data });
  }
  public getDepartmentById(departmentId: string) {
    return prisma.department.findUnique({ where: { id: departmentId } });
  }
  public getDepartmentsBySchoolId(schoolId: string) {
    return prisma.department.findMany({ where: { schoolId: schoolId } });
  }
  public updateDepartment(departmentId: string, data: Partial<Department>) {
    return prisma.department.update({
      where: { id: departmentId },
      data,
    });
  }
  public deleteDepartment(departmentId: string) {
    return prisma.department.delete({ where: { id: departmentId } });
  }
}

export const departmentHelpers = new DepartmentHelpers();
