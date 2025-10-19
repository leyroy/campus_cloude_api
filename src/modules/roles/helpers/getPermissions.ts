import { Permission } from '@prisma/client';
import prisma from '../../../config/prisma.config';

export const getPermissions = async () => {
  const results = await prisma.permission.findMany();
  const grouped = Object.values(
    results.reduce<Record<string, { resource: string; permissions: Permission[] }>>(
      (acc, item) => {
        if (!acc[item.resource]) {
          acc[item.resource] = { resource: item.resource, permissions: [] };
        }
        acc[item.resource].permissions.push(item);
        return acc;
      },
      {}
    )
  );
  return grouped;
};
