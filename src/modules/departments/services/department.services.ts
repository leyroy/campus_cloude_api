import { ErrorHandler } from '../../../middlewares/errorHandler';
import { departmentHelpers, DepartmentHelpers } from './department.helpers';
import { Department } from '@prisma/client';

class DepartmentServices {
  private departmentHelpers: DepartmentHelpers;
  constructor(departmentHelpers: DepartmentHelpers) {
    this.departmentHelpers = departmentHelpers;
  }
  public async createDepartment(
    data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    //TODO: logs for department creation
    const createdDepartment = await this.departmentHelpers.createDepartment(data);
    if (!createdDepartment) {
      throw new Error('Failed to create department');
    }
    return {
      success: true,
      message: 'Department created successfully',
      data: createdDepartment,
    };
  }

  public async getDepartmentById(departmentId: string) {
    const department = await this.departmentHelpers.getDepartmentById(departmentId);
    if (!department) {
      throw ErrorHandler.notFound('Department not found');
    }
    return {
      success: true,
      message: 'Department retrieved successfully',
    };
  }

  public async getDepartmentsBySchoolId(schoolId: string) {
    const departments = await this.departmentHelpers.getDepartmentsBySchoolId(schoolId);
    if (!departments || departments.length === 0) {
      throw ErrorHandler.notFound('No departments found for this school');
    }
    return {
      success: true,
      message: 'Departments retrieved successfully',
      data: departments,
    };
  }

  public async updateDepartment(
    departmentId: string,
    data: Partial<Omit<Department, 'id' | 'createdAt' | 'updatedAt'>>
  ) {
    const department = await this.departmentHelpers.getDepartmentById(departmentId);
    if (!department) {
      throw ErrorHandler.notFound('Department not found');
    }
    const updatedDepartment = await this.departmentHelpers.updateDepartment(
      departmentId,
      data
    );
    return {
      success: true,
      message: 'Department updated successfully',
      data: updatedDepartment,
    };
  }

  public async deleteDepartment(departmentId: string) {
    const department = await this.departmentHelpers.getDepartmentById(departmentId);
    if (!department) {
      throw ErrorHandler.notFound('Department not found');
    }
    await this.departmentHelpers.deleteDepartment(departmentId);
    return {
      success: true,
      message: 'Department deleted successfully',
    };
  }
}

export const departmentServices = new DepartmentServices(departmentHelpers);
