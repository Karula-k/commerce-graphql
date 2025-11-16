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
    return this.databaseService.order.create({
      data: {
        orderNumber: data.orderNumber,
        orderStatus: data.orderStatus as orderStatus,
        totalAmount: data.totalAmount,
        userId: data.userId,
      },
    });
  }
}
