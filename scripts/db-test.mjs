import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // insert 1 user (id auto-incrémenté)
  const u = await prisma.user.create({
    data: { username: 'user-test', password: 'password', role: 'ADMIN' }
  });
  console.log('Inserted:', u);

  // liste
  const all = await prisma.user.findMany();
  console.log('Users:', all);
}

main().catch(console.error).finally(() => prisma.$disconnect());
