import { Owner } from '@prisma/client';
import prisma from '../../../config/prisma.config';
import { CreateAddressDto, CreateOwnerDto, CreateSchoolProfileDto } from '../types';

export class SchoolHepers {
  public async createSchool(name: string, userId: string) {
    const school = await prisma.school.create({
      data: {
        name,
        createdBy: {
          connect: { id: userId },
        },
        updatedBy: {
          connect: { id: userId },
        },
      },
    });
    return school;
  }
  public async createSchoolOwner(data: CreateOwnerDto, schoolId: string) {
    return prisma.owner.create({
      data: {
        ...data,
        schoolId: schoolId,
        isActive: true,
      },
    });
  }
  public async createSchoolProfile(data: CreateSchoolProfileDto, schoolId: string, userId: string) {
    return prisma.schoolProfile.create({
      data: {
        ...data,
        schoolId: schoolId,
        updatedBy: {
          connect: { id: userId },
        },
      },
    });
  }
  public async createSchoolAddress(data: CreateAddressDto, schoolId: string) {
    return prisma.address.create({
      data: {
        ...data,
        schoolProfile: {
          connect: { id: schoolId },
        },
      },
    });
  }
  public async updateSchool(schoolId: string, data: Partial<Owner>) {
    return prisma.owner.update({
      where: { id: schoolId },
      data,
    });
  }
}

export const schoolHelpers = new SchoolHepers();
