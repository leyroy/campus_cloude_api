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
    const user = await this.commonDbServices.getUserById(userId);
    if (!user) {
      throw ErrorHandler.notFound('User not found');
    }

    const results = await this.schoolHelpers.configureSchoole(data, userId);
    if (!results) {
      throw ErrorHandler.internal('Error occured. Failed to configure school');
    }
    return {
      success: true,
      message: 'School created successfully, please wait for admin approval',
    };
  }
  public async getSchoolByUserID(userId: string) {
    const school = await this.schoolHelpers.getSchoolByUserId(userId);
    if (!school) {
      throw ErrorHandler.notFound('School not found');
    }
    return {
      success: true,
      data: school,
    };
  }
  public async updateSchoolInfo(schoolId: string, data: Partial<School>) {
    const updatedSchool = await this.schoolHelpers.updateSchool(schoolId, data);
    if (!updatedSchool) {
      throw ErrorHandler.internal('Error occurred. Failed to update school information');
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
