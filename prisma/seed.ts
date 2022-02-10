import { PrismaClient } from "@prisma/client";
import { actions as allActions, roleActions } from '../permissions'

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const actions = await Promise.all(
    allActions.map((action) =>
      prisma.action.create({
        data: {
          id: action,
          name: action,
        },
      })
    )
  );

  const roles = await Promise.all(
    Object.keys(roleActions).map((role) =>
      prisma.role.create({
        data: {
          id: role,
          name: role,
        },
      })
    )
  );

  for (let role of roles) {
    await prisma.role.update({
      where: {
        id: role.id,
      },
      data: {
        actions: {
          connect: roleActions[role.id].map((id: string) => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
