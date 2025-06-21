import { ErrorHandler } from '../../../middlewares/errorHandler';
import { UserHelpers } from './user.Helpres';

class UserServices {
  private userHelpers: UserHelpers;
  constructor(userHelpers: UserHelpers) {
    this.userHelpers = userHelpers;
  }
  public async getAuthUserProfile(userId: string) {
    const user = await this.userHelpers.getUserProfile(userId);
    const { password, ...userWithoutPassword } = user || {};
    const formatedUser = {
      ...userWithoutPassword,
      role: user?.userRoles
        .map((role) => role.role.rolePermissions)
        .flat()
        .map((permission) => permission.permission),
      school: user?.School,
    };
    if (!user) {
      throw ErrorHandler.notFound('User not found');
    }
    return formatedUser;
  }
}

export const userServices = new UserServices(new UserHelpers());
