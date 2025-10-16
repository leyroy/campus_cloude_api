import { School } from '@prisma/client';
import prisma from '../../../config/prisma.config';
import { CreateAddressDto, CreateOwnerDto, schoolProfileData } from '../types';

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
    data: schoolProfileData,
    schoolId: string,
    userId: string
  ) {
    return prisma.schoolProfile.create({
      data: {
        ...data,
        schoolId: schoolId,
        about: 'Some jobs ',
        principalBio: '',
        principalName: '',
        updatedById: userId,
        description: data.description,
        founderBio: 'Some information',
        founderName: data.founderName,
        licenseNumber: data.licenseNumber,
        slogan: data.slogan,
        adminNote: data.adminNote,
      },
    });
  }
  public getSchoolByUserId = async (userId: string) => {
    const school = await prisma.school.findFirst({
      where: {
        User: {
          some: { id: userId },
        },
      },
      include: {
        owner: true,
      },
    });
    return school;
  };
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
