import prisma from '../../config/prisma.config';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { CombindedStudent, GauidainUpdateDto, StudentUpdateDto } from './types';

class StudentService {
  public async createStudent(data: CombindedStudent) {
    try {
      const { studentInformation, guardianInformation } = data;
      const newStudent = await prisma.student.create({
        data: { ...studentInformation },
      });
      if (!newStudent || !newStudent?.id) {
        throw ErrorHandler.internal();
      }
      await prisma.guardian.createMany({
        data: guardianInformation.map((guardian) => ({
          ...guardian,
          studentId: newStudent?.id,
        })),
      });
      return { success: true, message: 'Student created successfully', newStudent };
    } catch (error) {
      throw error;
    }
  }
  public async getStudentsBySchoolId(schoolId: string) {
    return await prisma.student.findMany({
      where: { schoolId, AND: { isDeleted: false } },
    });
  }
  public async updateStudent(studentId: string, data: StudentUpdateDto) {
    try {
      const student = await prisma.student.update({
        where: { id: studentId, AND: { isDeleted: true } },
        data,
      });
      return {
        success: true,
        message: 'Student updated successfully',
        modelId: student.id,
      };
    } catch (error) {
      throw error;
    }
  }
  public async deleteStudent(studentId: string) {
    await prisma.student.update({ where: { id: studentId }, data: { isDeleted: true } });
    const document = await prisma.document.findFirst({ where: { modelId: studentId } });
    if (document) {
      await prisma.document.delete({ where: { id: document.id } });
    }
  }
  public async updateGauidian(gauidianId: string, data: Partial<GauidainUpdateDto>) {
    return await prisma.guardian.update({
      where: { id: gauidianId },
      data: {
        ...data,
      },
    });
  }
}

export const studentServices = new StudentService();
