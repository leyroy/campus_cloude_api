import prisma from '../../config/prisma.config';
import { VerificationEnum } from '../../enums/verification-code.enum';
import { CreateAddressDto } from '../../modules/school-configuration/types';
import { TABELS_NAMES_ENUM } from '../../types/types';

export class CommonDbServices {
  public userWithRole: boolean;

  constructor(userWithRole: boolean = false) {
    this.userWithRole = userWithRole;
  }

  public async assignAllPermissionsToSuperAdmin(roleId: string) {
    const permissions = await prisma.permission.findMany();
    const permissionsIds = permissions.map((permission) => permission.id);
    const saved = await prisma.rolePermission.createMany({
      data: permissionsIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
      skipDuplicates: true,
    });
    return saved;
  }

  public async getUsers() {
    return await prisma.user.findMany({});
  }

  public async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  public async createUser(data: any) {
    return await prisma.user.create({ data });
  }
  public async updateUser(userId: string, data: any) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }
  public async deleteUser(userId: string) {
    return await prisma.user.delete({ where: { id: userId } });
  }
  public async getUserPermissions(userId: string, roleId: string) {
    return await prisma.userRole.findFirst({
      where: {
        userId,
        roleId,
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
  }
  public async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  public async getUserByPhoneOrEmail({
    phone,
    email,
  }: {
    phone?: string;
    email?: string;
  }) {
    return await prisma.user.findFirst({
      where: { phone, email: email },
    });
  }

  public async deleteAllUsers() {
    return await prisma.user.deleteMany({});
  }

  //role and permissions services
  public async getRoles() {
    return await prisma.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }
  public async getRoleById(roleId: string) {
    return await prisma.role.findUnique({
      where: { id: roleId },
    });
  }

  public async getPermissions() {
    return prisma.permission.findMany({
      include: {
        rolePermissions: {
          select: {
            id: true,
          },
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  public async getVerificationCode(code: string, type: VerificationEnum) {
    return await prisma.verificationToken.findUnique({
      where: {
        token: code,
        type,
      },
    });
  }
  public async deleteVerificationCode(id: string) {
    return await prisma.verificationToken.delete({
      where: { id: id },
    });
  }

  public async deleteSession(id: string) {
    return await prisma.session.delete({
      where: { id },
    });
  }
  public async createAddress(
    data: CreateAddressDto,
    id: string,
    modelType: TABELS_NAMES_ENUM
  ) {
    const type = modelType === TABELS_NAMES_ENUM.SCHOOL_PROFILE ? 'schoolId' : 'userId';
    return await prisma.address.create({ data: { ...data, [type]: id } });
  }
}

export const commonDbService = new CommonDbServices();
