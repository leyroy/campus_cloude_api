import { School } from '@prisma/client';
import prisma from '../../../config/prisma.config';
import {
  CreateAddressDto,
  CreateOwnerDto,
  CreateSchoolConfigurationDto,
  schoolProfileData,
} from '../types';

export class SchoolHelpers {
  public async createSchoolOwner(data: CreateOwnerDto, schoolId: string) {
    return prisma.owner.create({
      data: {
        ...data,
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
      const newOwner = await tx.owner.create({
        data: { ...owner },
      });
      const newSchool = await tx.school.create({
        data: {
          name: name || '',
          updatedById: userId,
          description: schoolProfileData.description,
          level: 3,
          ownerId: newOwner.id,
          educationLevel: data.schoolProfile.level,
        },
      });
      await tx.user.update({
        where: { id: userId },
        data: { schoolId: newSchool.id },
      });

      const { level, ...res } = schoolProfileData;
      const profile = await tx.schoolProfile.create({
        data: {
          ...res,
          schoolId: newSchool.id,
          about: 'Some jobs ',
          principalBio: '',
          principalName: '',
          updatedById: userId,
          contactEmail: res.contactEmail,
          motto: res.motto,
          description: res.description,
          founderBio: res.founderBio,
          founderName: res.founderName,
          licenseNumber: res.licenseNumber,
          slogan: res.slogan,
          adminNote: res.adminNote,
        },
      });
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
