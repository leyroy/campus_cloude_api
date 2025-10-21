import { studentHelper, StudentHelper } from './student.helpers';

class StudentService {
  private studentHelper: StudentHelper;
  constructor({ studentHelper }: { studentHelper: StudentHelper }) {
    this.studentHelper = studentHelper;
  }
}

export const StudentServices = new StudentService({ studentHelper: studentHelper });
