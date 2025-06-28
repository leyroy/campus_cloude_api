import { ErrorHandler } from '../../../middlewares/errorHandler';
import { CreateClassDto, CreateClassType } from '../types';
import { ClassHelpers } from './class.helpers';

class ClassService {
  private classHelper: ClassHelpers;
  constructor(classHelper: ClassHelpers) {
    this.classHelper = classHelper;
  }

  public async createClass(data: CreateClassDto) {
    const newClass = await this.classHelper.createClass(data);
    if (!newClass) {
      throw ErrorHandler.internal('Failed to create class');
    }
    return {
      message: 'Class created successfully',
      data: newClass,
    };
  }

  // Class implementation goes here
}

export const classService = new ClassService(new ClassHelpers());
