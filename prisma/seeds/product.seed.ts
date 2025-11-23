import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop',
      category: 'Electronics',
      price: 1200.0,
      stock: 10,
    },
  });
  const product2 = await prisma.product.create({
    data: {
      name: 'Book',
      category: 'Books',
      price: 20.0,
      stock: 100,
    },
  });
  return [product1, product2];
}
