import prisma from "../../config/prisma.config";

export class CommonDbServices {
  public userWithRole: boolean;

  constructor(userWithRole: boolean = false) {
    this.userWithRole = userWithRole;
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

 public async getUserPermissions(userId:string,roleId:string){
    return await prisma.userRole.findFirst({
      where: {
        userId,
        roleId
      },
      include:{
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      }
    })
 }
  public async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: this.userWithRole ? { 
        userRoles:{
          include:{
            role:{
              include:{
                rolePermissions:{
                  include: {
                    permission: true,
                  }
                }
              }
            }
          }
        }
       } : undefined,
    });
  }

  public async deleteAllUsers() {
    return await prisma.user.deleteMany({});
  }

  //role and permissions services
  public async getRoles() {
    return await prisma.role.findMany({
      include:{
        rolePermissions:{
          include:{
            permission:true
          }
        }
      }
    });
  }
  public async getRoleById(roleId: string) {
    return await prisma.role.findUnique({
      where: { id: roleId },
    });
  }

  public async getPermissions (){
    return prisma.permission.findMany({
      include:{
        rolePermissions:{
          select:{
            id:true
          },
          include:{
            role:{
              select:{
                name:true
              }
            }
          }
        }
      }
    })
  }
}
