import { schoolHelpers, SchoolHepers } from './school.helpers';
import { CreateSchoolConfigurationDto } from '../types';
import { commonDbService, CommonDbServices } from '../../../utils/db/commonDbServices';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { School } from '@prisma/client';

class SchoolServices {
  private schoolHelpers: SchoolHepers;
  private commonDbServices: CommonDbServices;
  constructor(schoolHelpers: SchoolHepers, commonDbServices: CommonDbServices) {
    this.schoolHelpers = schoolHelpers;
    this.commonDbServices = commonDbServices;
  }
  public async createSchoolProfile(data: CreateSchoolConfigurationDto, userId: string) {
    const { schoolProfile, owner, address, schoolAddress } = data;
    const user = await this.commonDbServices.getUserById(userId);
    if (!user) {
      throw ErrorHandler.notFound('User not found');
    }
    const schoolName = user.firstName + ' ' + user.lastName + ' School';
    const createdSchool = await this.schoolHelpers.createSchool(schoolName, userId);
    if (!createdSchool) {
      throw ErrorHandler.internal('Failed to create school');
    }
    const [createdOwner, createdProfile, createdAddress] = await Promise.all([
      this.schoolHelpers.createSchoolOwner(owner, createdSchool.id),
      this.schoolHelpers.createSchoolProfile(schoolProfile, createdSchool.id, userId),
      this.commonDbServices.createAddress(schoolAddress, createdSchool.id),
      this.commonDbServices.createAddress(address, user.id),
    ]);
    if (!createdOwner || !createdProfile || !createdAddress) {
      throw ErrorHandler.internal('Failed to create school configuration');
    }
    return {
      success: true,
      message: 'School configuration created successfully',
    };

    //1. get user
  }

  public async updateSchoolInfo(schoolId: string, data: Partial<School>) {
    const updatedSchool = await this.schoolHelpers.updateSchool(schoolId, data);
    if (!updatedSchool) {
      throw ErrorHandler.internal('Failed to update school information');
    }
    return {
      success: true,
      message: 'School information updated successfully',
    };
  }
}

const schoolServices = new SchoolServices(schoolHelpers, commonDbService);
export default schoolServices;
