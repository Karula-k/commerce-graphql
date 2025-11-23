import { PrismaClient } from '@prisma/client';

import { seedUsers } from './seeds/user.seed';
import { seedProducts } from './seeds/product.seed';
import { seedOrders } from './seeds/order.seed';

async function main() {
  const prisma = new PrismaClient();
  const users = await seedUsers(prisma);
  const products = await seedProducts(prisma);
  await seedOrders(prisma, users, products);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
