import { School } from '@prisma/client';
import prisma from '../../../config/prisma.config';
import { CreateAddressDto, CreateOwnerDto, CreateSchoolProfileDto } from '../types';

export class SchoolHelpers {
  public async createSchool(data: {
    name: string;
    userId: string;
    description: string;
    level: number;
  }) {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        description: data.description || `Welcome to ${data.name}`,
        updatedById: data.userId,
        level: data.level,
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
  public async createSchoolProfile(
    data: CreateSchoolProfileDto,
    schoolId: string,
    userId: string
  ) {
    return prisma.schoolProfile.create({
      data: {
        ...data,
        schoolId: schoolId,
        updatedById: userId,
        description: data.description,
        founderBio: data.founderBio,
        founderName: data.founderName,
        licenseNumber: data.licenseNumber,
        principalBio: data.principalBio,
        principalName: data.principalName,
        slogan: data.slogan,
        adminNote: data.adminNote,
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
  public async updateSchool(schoolId: string, data: Partial<School>) {
    return prisma.school.update({
      where: { id: schoolId },
      data,
    });
  }
  public async deleteSchool(schoolId: string) {
    await prisma.school.delete({
      where: { id: schoolId },
    });
  }
}

export const schoolHelpers = new SchoolHelpers();
