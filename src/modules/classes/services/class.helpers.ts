import { Class } from '@prisma/client';

export class ClassHelpers {
  public async createClass(data: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>) {}
}
