"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = hasPermission;
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
function hasPermission(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, resource, action, }) {
        // Get all active roles for the user
        const userRoles = yield prisma_config_1.default.userRole.findMany({
            where: {
                userId,
                role: {
                    isActive: true,
                },
            },
            include: {
                role: {
                    include: {
                        rolePermissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
        // Check all permissions across all roles
        return userRoles.some((userRole) => userRole.role.rolePermissions.some((rolePermission) => rolePermission.permission.resource === resource &&
            rolePermission.permission.action === action));
    });
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
