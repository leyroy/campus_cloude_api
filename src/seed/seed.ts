import { permissions, plans } from '../constants/sead';
import prisma from '../config/prisma.config';
import { BillingCycle } from '@prisma/client';

//clean up the database before seeding
async function cleanDatabase() {
  console.log('🧹 Cleaning up the database...');
  await prisma.$transaction(async (tx) => {
    await tx.user.deleteMany({});
    await tx.school.deleteMany({});
    await tx.planFeature.deleteMany({});
    await tx.plan.deleteMany({});
    await tx.role.deleteMany({});
    await tx.permission.deleteMany({});
  });
}

async function seedPermissions() {
  for (const perm of permissions) {
    const name = `${perm.resource}:${perm.action}`;
    await prisma.permission.create({
      data: {
        name,
        action: perm.action,
        resource: perm.resource,
        description: `Allows ${perm.action} on ${perm.resource}`,
      },
    });
  }
  console.log('✅ Permissions seeded successfully!');
}
async function seedPlans() {
  for (const plan of plans) {
    const created = await prisma.plan.create({
      data: {
        name: plan.name,
        price: plan.price,
        billingCycle: plan.billingCycle as BillingCycle,
        isActive: plan.isActive,
        features: {
          create: plan.features.map((f) => ({
            name: f.name,
            description: f.description,
            isEnabled: f.isEnabled,
            metadata: f.metadata,
          })),
        },
        limits: {
          create: { ...plan.limits },
        },
      },
    });

    console.log(`✅ Seeded plan: ${created.name}`);
  }

  console.log('🔥 All plans seeded!');
}

async function main() {
  await cleanDatabase();
  console.log('🧹 Database cleaned successfully!');
  return Promise.all([seedPermissions(), seedPlans()]);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding permissions', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
