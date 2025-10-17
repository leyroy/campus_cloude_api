import { School } from '@prisma/client';
import prisma from '../../../config/prisma.config';
import {
  CreateAddressDto,
  CreateOwnerDto,
  CreateSchoolConfigurationDto,
  schoolProfileData,
} from '../types';

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
  public async configureSchoole(data: CreateSchoolConfigurationDto, userId: string) {
    const {
      schoolProfile: { name, ...schoolProfileData },
      owner,
      schoolAddress,
    } = data;
    return await prisma.$transaction(async (tx) => {
      const newSchool = await tx.school.create({
        data: {
          name: name || '',
          updatedById: userId,
          description: schoolProfileData.description,
          level: 3,
        },
      });
      await tx.user.update({
        where: { id: userId },
        data: { schoolId: newSchool.id },
      });
      const newOwner = await tx.owner.create({
        data: { ...owner, schoolId: newSchool.id },
      });

      const profile = await tx.schoolProfile.create({
        data: {
          ...schoolProfileData,
          schoolId: newSchool.id,
          about: 'Some jobs ',
          principalBio: '',
          principalName: '',
          updatedById: userId,
          description: schoolProfileData.description,
          founderBio: 'Some information',
          founderName: schoolProfileData.founderName,
          licenseNumber: schoolProfileData.licenseNumber,
          slogan: schoolProfileData.slogan,
          adminNote: schoolProfileData.adminNote,
        },
      });
      console.log(newSchool.id, 'new school id');
      const address = await tx.address.create({
        data: {
          ...schoolAddress,
          userId: userId,
        },
      });

      return { newSchool, newOwner, profile, address };
    });
  }
  public getSchoolByUserId = async (userId: string) => {
    const school = await prisma.school.findFirst({
      where: {
        users: {
          some: { id: userId },
        },
      },
      include: {
        owner: true,
        users: true,
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
