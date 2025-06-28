import { Class } from '@prisma/client';
import prisma from '../../../config/prisma.config';
import { CreateClassDto } from '../types';

export class ClassHelpers {
  public async createClass(data: CreateClassDto) {
    return await prisma.class.create({ data: { ...data } });
  }
}
