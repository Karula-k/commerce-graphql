import { PrismaClient } from '@prisma/client';

import type { User, Product } from '@prisma/client';

export async function seedOrders(
  prisma: PrismaClient,
  users: User[],
  products: Product[],
) {
  const order1 = await prisma.order.create({
    data: {
      userId: users[0].id,
      orderNumber: 'ORD-1001',
      orderStatus: 'pending',
      totalAmount: 1240.0,
      orderProducts: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 1200.0,
          },
          {
            productId: products[1].id,
            quantity: 2,
            price: 20.0,
          },
        ],
      },
      transactions: {
        create: [
          {
            paymentStatus: 'pending',
            amount: 1240.0,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: users[1].id,
      orderNumber: 'ORD-1002',
      orderStatus: 'draft',
      totalAmount: 1200.0,
      orderProducts: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 1200.0,
          },
        ],
      },
      transactions: {
        create: [
          {
            paymentStatus: 'pending',
            amount: 1200.0,
          },
        ],
      },
    },
  });
  return [order1, order2];
}
