export const permissions = [
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

  { resource: 'auth', action: 'login' },
  { resource: 'auth', action: 'logout' },
  { resource: 'auth', action: 'impersonate' },

  // REPORT
  { resource: 'report', action: 'generate' },
  { resource: 'report', action: 'view' },
  { resource: 'report', action: 'export' },
];
