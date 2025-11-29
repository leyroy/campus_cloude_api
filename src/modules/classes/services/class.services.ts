import { ErrorHandler } from '../../../middlewares/errorHandler';
import { CreateClassInput } from '../types';
import { ClassHelpers } from './class.helpers';

class ClassService {
  private classHelper: ClassHelpers;
  constructor(classHelper: ClassHelpers) {
    this.classHelper = classHelper;
  }

  public async createClass(
    data: CreateClassInput & { schoolId: string; createdById: string }
  ) {
    const newClass = await this.classHelper.createClass(data);
    if (!newClass) {
      throw ErrorHandler.internal('Failed to create class');
    }
    return {
      message: 'Class created successfully',
      data: newClass,
    };
  }
  public async updateClass(
    data: Partial<CreateClassInput> & { updatedById: string },
    classId: string
  ) {
    const updatedClass = await this.classHelper.updateClass(data, classId);
    if (!updatedClass) {
      throw ErrorHandler.internal('Failed to update class');
    }
    return {
      message: 'Class updated successfully',
      data: updatedClass,
    };
  }

  public async deleteClassByClassId(classId: string) {
    // Implement delete logic here
    await this.classHelper.deleteClass(classId);
    return {
      message: 'Class deleted successfully',
    };
  }
  public async getClassById(classId: string) {
    // Implement get logic here
    const classData = await this.classHelper.getClassById(classId);
    if (!classData) {
      throw ErrorHandler.notFound('Class not found');
    }
    return {
      message: 'Class retrieved successfully',
      data: classData,
    };
  }
  //list all student by schooleid
  public async listClassesBySchoolId(schoolId: string) {
    const classes = await this.classHelper.getClassesBySchoolId(schoolId);
    if (!classes) {
      throw ErrorHandler.notFound('No classes found for the given school ID');
    }
    return {
      message: 'Classes retrieved successfully',
      data: classes,
    };
  }
  public async listClassesByAdming() {
    const classes = await this.classHelper.listAllClasses();
    if (!classes) {
      throw ErrorHandler.notFound('No classes found for the given school ID');
    }
    return {
      message: 'Classes retrieved successfully',
      data: classes,
    };
  }
}

export const classService = new ClassService(new ClassHelpers());
