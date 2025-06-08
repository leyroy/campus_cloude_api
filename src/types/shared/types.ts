import { Request } from 'express';
import { IJwtPayload } from '../prisma';

export type CreateReturns = {
  success: boolean;
  message: string;
};

export enum TABELS_NAMES_ENUM {
  USERS = 'User',
  SCHOOL = 'School',
  OWNER = 'Owner',
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  CLASS = 'Class',
  SUBJECT = 'Subject',
  ATTENDANCE = 'Attendance',
  EXAM = 'Exam',
  EXAM_RESULT = 'ExamResult',
  PARRENT = 'Parent',
  SCHOOL_FEE = 'Fee',
  ADDRESS = 'Address',
  EVENT = 'Event',
  STAFF = 'Staff',
  ROLE = 'Role',
  PERMISSION = 'Permission',
  USER_ROLE = 'UserRole',
  ROLE_PERMISSION = 'RolePermission',
  NOTIFICATION = 'Notification',
  TIMETABLE = 'Timetable',
}

export interface CustomRequest extends Request {
  user: TokenTypes;
}

export enum Resource {
  STUDENT = 'student',
  TEACHER = 'teacher',
  CLASS = 'class',
  SUBJECT = 'subject',
  RESULT = 'result',
  FEE = 'fee',
  SCHOOL = 'school',
  STAFF = 'staff',
  ROLE = 'role',
  PERMISSION = 'permission',
  USER = 'user',
  AUTH = 'auth',
  REPORT = 'report',
}

export enum Action {
  CREATE = 'create',
  VIEW = 'view',
  UPDATE = 'update',
  DELETE = 'delete',
  PROMOTE = 'promote',
  SUSPEND = 'suspend',
  ASSIGN_CLASS = 'assign_class',
  ASSIGN_SUBJECT = 'assign_subject',
  ASSIGN_TEACHER = 'assign_teacher',
  PUBLISH = 'publish',
  PAY = 'pay',
  GENERATE_INVOICE = 'generate_invoice',
  ASSIGN_OWNER = 'assign_owner',
  ASSIGN_ROLE = 'assign_role',
  RESET_PASSWORD = 'reset_password',
  LOGIN = 'login',
  LOGOUT = 'logout',
  IMPERSONATE = 'impersonate',
  GENERATE = 'generate',
  EXPORT = 'export',
  ASSIGN_TO_ROLE = 'assign_to_role',
}

export type PERMISSION = {
  resource: Resource;
  action: Action;
};

export type TokenTypes = {
  userId: string;
  sessionId: string;
};
