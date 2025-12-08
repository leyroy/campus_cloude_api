"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plans = exports.permissions = void 0;
exports.permissions = [
    // STUDENT
    { resource: 'student', action: 'create' },
    { resource: 'student', action: 'view' },
    { resource: 'student', action: 'update' },
    { resource: 'student', action: 'delete' },
    { resource: 'student', action: 'promote' },
    { resource: 'student', action: 'suspend' },
    { resource: 'student', action: 'assign_class' },
    // TEACHER
    { resource: 'teacher', action: 'create' },
    { resource: 'teacher', action: 'view' },
    { resource: 'teacher', action: 'update' },
    { resource: 'teacher', action: 'delete' },
    { resource: 'teacher', action: 'assign_subject' },
    // CLASS
    { resource: 'class', action: 'create' },
    { resource: 'class', action: 'view' },
    { resource: 'class', action: 'update' },
    { resource: 'class', action: 'delete' },
    { resource: 'class', action: 'assign_teacher' },
    // SUBJECT
    { resource: 'subject', action: 'create' },
    { resource: 'subject', action: 'view' },
    { resource: 'subject', action: 'update' },
    { resource: 'subject', action: 'delete' },
    // DEPARTMENT
    { resource: 'department', action: 'create' },
    { resource: 'department', action: 'view' },
    { resource: 'department', action: 'update' },
    { resource: 'department', action: 'delete' },
    // RESULT
    { resource: 'result', action: 'create' },
    { resource: 'result', action: 'view' },
    { resource: 'result', action: 'update' },
    { resource: 'result', action: 'delete' },
    { resource: 'result', action: 'publish' },
    // FEE
    { resource: 'fee', action: 'create' },
    { resource: 'fee', action: 'view' },
    { resource: 'fee', action: 'update' },
    { resource: 'fee', action: 'delete' },
    { resource: 'fee', action: 'pay' },
    { resource: 'fee', action: 'generate_invoice' },
    // SCHOOL
    { resource: 'school', action: 'create' },
    { resource: 'school', action: 'view' },
    { resource: 'school', action: 'update' },
    { resource: 'school', action: 'delete' },
    { resource: 'school', action: 'assign_owner' },
    // STAFF
    { resource: 'staff', action: 'create' },
    { resource: 'staff', action: 'view' },
    { resource: 'staff', action: 'update' },
    { resource: 'staff', action: 'delete' },
    { resource: 'staff', action: 'assign_role' },
    // ROLE & PERMISSION
    { resource: 'role', action: 'create' },
    { resource: 'role', action: 'view' },
    { resource: 'role', action: 'update' },
    { resource: 'role', action: 'delete' },
    { resource: 'permission', action: 'view' },
    { resource: 'permission', action: 'assign_to_role' },
    // USER & AUTH
    { resource: 'user', action: 'create' },
    { resource: 'user', action: 'view' },
    { resource: 'user', action: 'update' },
    { resource: 'user', action: 'delete' },
    { resource: 'user', action: 'reset_password' },
    { resource: 'user', action: 'assign_role' },
    { resource: 'auth', action: 'login' },
    { resource: 'auth', action: 'logout' },
    { resource: 'auth', action: 'impersonate' },
    // REPORT
    { resource: 'report', action: 'generate' },
    { resource: 'report', action: 'view' },
    { resource: 'report', action: 'export' },
    //Schoole Terms
    { resource: 'term', action: 'create' },
    { resource: 'term', action: 'view' },
    { resource: 'term', action: 'update' },
    { resource: 'term', action: 'delete' },
];
exports.plans = [
    {
        name: 'Starter',
        price: 0,
        billingCycle: 'MONTHLY',
        isActive: true,
        features: [
            {
                name: 'Student Management',
                description: 'Add and manage students',
                isEnabled: true,
                metadata: {
                    canPromote: false,
                    maxParentsPerStudent: 1,
                },
            },
            {
                name: 'Basic Quizzes',
                description: 'Create up to 20 quizzes',
                isEnabled: true,
                metadata: {
                    maxQuestions: 10,
                    autoGrading: false,
                    allowMediaQuestions: false,
                },
            },
            {
                name: 'Basic Notifications',
                description: 'Limited SMS/email alerts',
                isEnabled: true,
                metadata: {
                    channels: ['email'],
                    maxRecipients: 100,
                },
            },
            {
                name: 'Timetable Builder',
                description: 'Manual timetable setup',
                isEnabled: false,
                metadata: {
                    autoGenerate: false,
                    allowConflicts: false,
                },
            },
        ],
        limits: {
            maxStudents: 200,
            maxTeachers: 10,
            maxClasses: 20,
            maxDepartments: 5,
            maxSubjects: 40,
            maxQuizzes: 20,
            maxNotifications: 100,
            maxFileUploadsMb: 200,
            maxTimetables: 5,
        },
    },
    {
        name: 'Pro',
        price: 2999,
        billingCycle: 'MONTHLY',
        isActive: true,
        features: [
            {
                name: 'Student Management',
                description: 'Full control over student records',
                isEnabled: true,
                metadata: {
                    canPromote: true,
                    maxParentsPerStudent: 3,
                },
            },
            {
                name: 'Advanced Quizzes',
                description: 'Auto-marking + unlimited questions',
                isEnabled: true,
                metadata: {
                    maxQuestions: 100,
                    autoGrading: true,
                    allowMediaQuestions: true,
                },
            },
            {
                name: 'Smart Notifications',
                description: 'Send alerts to students, parents, staff',
                isEnabled: true,
                metadata: {
                    channels: ['email', 'sms'],
                    maxRecipients: 1000,
                    supportCustomTemplate: true,
                },
            },
            {
                name: 'Timetable Builder',
                description: 'Automated timetable generation',
                isEnabled: true,
                metadata: {
                    autoGenerate: true,
                    allowConflicts: false,
                },
            },
        ],
        limits: {
            maxStudents: 1000,
            maxTeachers: 50,
            maxClasses: 80,
            maxDepartments: 10,
            maxSubjects: 150,
            maxQuizzes: 300,
            maxNotifications: 1000,
            maxFileUploadsMb: 1024,
            maxTimetables: 20,
        },
    },
    {
        name: 'Enterprise',
        price: 8999,
        billingCycle: 'MONTHLY',
        isActive: true,
        features: [
            {
                name: 'Student Management',
                description: 'Unlimited student handling',
                isEnabled: true,
                metadata: {
                    canPromote: true,
                    maxParentsPerStudent: 5,
                },
            },
            {
                name: 'Quiz + LMS',
                description: 'Quizzes, lessons, progress tracking',
                isEnabled: true,
                metadata: {
                    maxQuestions: 200,
                    autoGrading: true,
                    allowMediaQuestions: true,
                },
            },
            {
                name: 'Custom Notifications',
                description: 'Email, SMS, push + automation',
                isEnabled: true,
                metadata: {
                    channels: ['email', 'sms', 'push'],
                    maxRecipients: 10000,
                    supportCustomTemplate: true,
                },
            },
            {
                name: 'Advanced Timetable AI',
                description: 'Auto-generate optimized schedules',
                isEnabled: true,
                metadata: {
                    autoGenerate: true,
                    allowConflicts: true,
                },
            },
            {
                name: 'Analytics & Reports',
                description: 'Full school insights dashboard',
                isEnabled: true,
                metadata: {
                    includePerformance: true,
                    trackAttendance: true,
                    exportOptions: ['pdf', 'excel'],
                },
            },
        ],
        limits: {
            maxStudents: 10000,
            maxTeachers: 500,
            maxClasses: 300,
            maxDepartments: 50,
            maxSubjects: 500,
            maxQuizzes: 2000,
            maxNotifications: 10000,
            maxFileUploadsMb: 10000,
            maxTimetables: 100,
        },
    },
];
