import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DatabaseService } from 'src/database/database.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { orderStatus } from '@prisma/client';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  @Query(() => [OrderEntity], { nullable: true })
  async getOrders(): Promise<OrderEntity[]> {
    return this.databaseService.order.findMany();
  }

  @Query(() => OrderEntity, { nullable: true })
  async getOrder(@Args('id') id: string): Promise<OrderEntity | null> {
    return this.databaseService.order.findUnique({
      where: { id },
    });
  }

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args('data') data: CreateOrderInput,
  ): Promise<OrderEntity> {
    const orderProducts = data.orderProducts;
    const productIds = orderProducts.map((op) => op.productId);
    const products = await this.databaseService.product.findMany({
      where: { id: { in: productIds } },
    });
    if (products.length !== productIds.length) {
      throw new Error('One or more products do not exist');
    }
    for (const op of orderProducts) {
      const product = products.find((p) => p.id === op.productId);
      if (!product || product.stock < op.quantity) {
        throw new Error(
          `Product ${op.productId} is not available or not enough stock`,
        );
      }
    }
    const totalAmount = orderProducts.reduce(
      (sum, op) => sum + op.price * op.quantity,
      0,
    );
    const created = await this.databaseService.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          orderNumber: data.orderNumber,
          orderStatus: data.orderStatus as orderStatus,
          totalAmount,
          userId: data.userId,
        },
      });
      for (const op of orderProducts) {
        await prisma.orderProduct.create({
          data: {
            orderId: order.id,
            productId: op.productId,
            quantity: op.quantity,
            price: op.price,
          },
        });
        await prisma.product.update({
          where: { id: op.productId },
          data: { stock: { decrement: op.quantity } },
        });
      }
      return order;
    });
    return created;
  }
}
