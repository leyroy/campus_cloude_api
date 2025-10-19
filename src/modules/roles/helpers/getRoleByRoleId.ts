import prisma from '../../../config/prisma.config';

export const getRoleByRoleId = async (roleId: string) => {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
    include: {
      createdBy: true,
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
  const formatedRoleStructure = {
    ...role,
    permissions: role?.rolePermissions.map((rp) => rp.permission),
  };
  const { rolePermissions, ...res } = formatedRoleStructure;
  return res;
};
