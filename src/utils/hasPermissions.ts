import prisma from "../config/prisma.config";

export type HasPermission = {
  userId: string,
  resource: string,
  action: string
}
export async function hasPermission({userId,resource,action}:HasPermission): Promise<boolean> {
  // Get all active roles for the user
  const userRoles = await prisma.userRole.findMany({
    where: {
      userId,
      role: {
        isActive: true
      }
    },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true
            }
          }
        }
      }
    }
  });

  // Check all permissions across all roles
  return userRoles.some(userRole =>
    userRole.role.rolePermissions.some(rolePermission =>
      rolePermission.permission.resource === resource &&
      rolePermission.permission.action === action
    )
  );
}

/**
 * Get all permissions for a user (useful for caching)
 * @param userId - ID of the user
 * @returns Array of permissions
 */
// export async function getUserPermissions(userId: string) {
//   const userRoles = await prisma.userRole.findMany({
//     where: {
//       userId,
//       role: {
//         isActive: true
//       }
//     },
//     include: {
//       role: {
//         include: {
//           rolePermissions: {
//             include: {
//               permission: true
//             }
//           }
//         }
//       }
//     }
//   });

//   // Extract unique permissions
//   const permissions = new Map<string, Permission>();
//   userRoles.forEach(userRole => {
//     userRole.role.rolePermissions.forEach(rp => {
//       permissions.set(rp.permission.id, rp.permission);
//     });
//   });
// console.log(permissions)
//   return Array.from(permissions.values());
// }