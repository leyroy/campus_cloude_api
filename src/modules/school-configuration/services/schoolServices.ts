import { SchoolProfile } from '@prisma/client';
import { schoolHelpers, SchoolHepers } from './school.helpers';

class SchoolServices {
  private schoolHelpers: SchoolHepers;
  constructor(schoolHelpers: SchoolHepers) {
    this.schoolHelpers = schoolHelpers;
  }
  public async createSchoolProfile(data: SchoolProfile, userId: string) {
    //1. get user
  }
}

const schoolServices = new SchoolServices(schoolHelpers);
export default schoolServices;
