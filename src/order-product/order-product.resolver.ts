import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { OrderProductEntity } from './entities/order-product.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';

import { CreateOrderProductInput } from './dto/create-order-product.input';
import { UpdateOrderProductInput } from './dto/update-order-product.input';

@Resolver(() => OrderProductEntity)
export class OrderProductResolver {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  @Mutation(() => OrderProductEntity)
  async createOrderProduct(
    @Args('data') data: CreateOrderProductInput,
  ): Promise<OrderProductEntity> {
    return this.databaseService.orderProduct.create({
      data,
      include: { order: true, product: true },
    });
  }

  @Mutation(() => OrderProductEntity, { nullable: true })
  async updateOrderProduct(
    @Args('data') data: UpdateOrderProductInput,
  ): Promise<OrderProductEntity | null> {
    const { id, ...updateData } = data;
    return this.databaseService.orderProduct.update({
      where: { id },
      data: updateData,
      include: {
        order: true,
        product: true,
      },
    });
  }

  @Query(() => [OrderProductEntity], { nullable: true })
  async getOrderProducts(): Promise<Partial<OrderProductEntity>[]> {
    return this.databaseService.orderProduct.findMany();
  }

  @Query(() => OrderProductEntity, { nullable: true })
  async getOrderProduct(
    @Args('id') id: string,
  ): Promise<Partial<OrderProductEntity> | null> {
    return this.databaseService.orderProduct.findUnique({
      where: { id },
    });
  }

  @ResolveField(() => ProductEntity, { nullable: true })
  async product(
    @Parent() orderProduct: OrderProductEntity,
  ): Promise<ProductEntity | null> {
    return this.databaseService.product.findUnique({
      where: { id: orderProduct.productId },
    });
  }

  @ResolveField(() => OrderEntity, { nullable: true })
  async order(
    @Parent() orderProduct: OrderProductEntity,
  ): Promise<OrderEntity | null> {
    return this.databaseService.order.findUnique({
      where: { id: orderProduct.orderId },
    });
  }
}
