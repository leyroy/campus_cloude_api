import { permissions } from "../src/constants/sead";
import prisma from "../src/config/prisma.config";

async function seedPermissions() {
  for (const perm of permissions) {
    const name = `${perm.resource}:${perm.action}`;
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: {
        name,
        action: perm.action,
        resource: perm.resource,
        description: `Allows ${perm.action} on ${perm.resource}`,
      },
    });
  }
  console.log("✅ Permissions seeded successfully!");
}

seedPermissions()
  .catch((e) => {
    console.error("❌ Error seeding permissions", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
