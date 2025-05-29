import { permissions } from "../constants/sead";
import prisma from "../config/prisma.config";

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
