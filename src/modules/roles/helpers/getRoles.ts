import prisma from '../../../config/prisma.config';

export const getRoles = async () => {
  const roles = await prisma.role.findMany({
    include: {
      rolePermissions: {
        include: {
          permission: true,
        },
      },
      userRoles: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              id: true,
              isActive: true,
              schoolId: true,
            },
          },
        },
      },
    },
  });
  //format to the structure {roleId, roleName, permissions: [permission1, permission2, ...]}
  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    isActive: role.isActive,
    permissions: role.rolePermissions.map((rp) => rp.permission),
    users: role.userRoles.map((ur) => ur.user),
  }));
};
