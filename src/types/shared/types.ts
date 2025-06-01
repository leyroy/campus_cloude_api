import { Request } from "express";
import { IJwtPayload } from "../prisma";

export type CreateReturns = {
  success: boolean;
  message: string;
}

export enum TABELS_NAMES_ENUM {
  USERS = "User",
  SCHOOL = "School",
  OWNER = "Owner",
  STUDENT = "Student",
  TEACHER = "Teacher",
  CLASS = "Class",
  SUBJECT = "Subject",
  ATTENDANCE = "Attendance",
  EXAM = "Exam",
  EXAM_RESULT = "ExamResult",
  PARRENT = "Parent",
  SCHOOL_FEE = "Fee",
  ADDRESS = "Address",
  EVENT = "Event",
  STAFF = "Staff",
  ROLE = "Role",
  PERMISSION = "Permission",
  USER_ROLE = "UserRole",
  ROLE_PERMISSION = "RolePermission",
  NOTIFICATION = "Notification",
  TIMETABLE = "Timetable",
}

export interface CustomRequest extends Request {
  user: IJwtPayload
}