import { schoolHelpers, SchoolHelpers } from './school.helpers';
import { CreateSchoolConfigurationDto } from '../types';
import { commonDbService, CommonDbServices } from '../../../utils/db/commonDbServices';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { School } from '@prisma/client';
import { TABELS_NAMES_ENUM } from '../../../types/types';

class SchoolServices {
  private schoolHelpers: SchoolHelpers;
  private commonDbServices: CommonDbServices;
  constructor(schoolHelpers: SchoolHelpers, commonDbServices: CommonDbServices) {
    this.schoolHelpers = schoolHelpers;
    this.commonDbServices = commonDbServices;
  }
  public async createSchoolProfile(data: CreateSchoolConfigurationDto, userId: string) {
    const { schoolProfile, owner, address, schoolAddress } = data;
    const user = await this.commonDbServices.getUserById(userId);
    if (!user) {
      throw ErrorHandler.notFound('User not found');
    }
    const schoolName = schoolProfile.name || `${user.firstName} ${user.lastName} School`;
    const createdSchool = await this.schoolHelpers.createSchool({
      name: schoolName,
      userId,
      description: schoolProfile.description,
      level: schoolProfile.level,
    });
    if (!createdSchool) {
      throw ErrorHandler.internal('Failed to create school');
    }
    const [createdOwner, createdProfile, createdAddress] = await Promise.all([
      this.schoolHelpers.createSchoolOwner(owner, createdSchool.id),
      this.schoolHelpers.createSchoolProfile(schoolProfile, createdSchool.id, userId),
      this.commonDbServices.createAddress(
        schoolAddress,
        createdSchool.id,
        TABELS_NAMES_ENUM.SCHOOL_PROFILE
      ),
      this.commonDbServices.createAddress(address, user.id, TABELS_NAMES_ENUM.USERS),
    ]);
    if (!createdOwner || !createdProfile || !createdAddress) {
      throw ErrorHandler.internal('Failed to create school configuration');
    }
    return {
      success: true,
      message: 'School created successfully, please wait for admin approval',
    };
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
  public async deleteSchool(schoolId: string) {
    await this.schoolHelpers.deleteSchool(schoolId);
    return {
      success: true,
      message: 'School was deleted successfully',
    };
  }
}

const schoolServices = new SchoolServices(schoolHelpers, commonDbService);
export default schoolServices;
