import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  const user1 = await prisma.user.create({
    data: { name: 'USER1' },
  });
  const user2 = await prisma.user.create({
    data: { name: 'USER2' },
  });
  return [user1, user2];
}
