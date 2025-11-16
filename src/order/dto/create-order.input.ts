import { InputType, Field, Float } from '@nestjs/graphql';
import { orderStatus } from '@prisma/client';
import { CreateOrderProductInput } from '../../order-product/dto/create-order-product.input';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  orderNumber: string;

  @Field(() => orderStatus, { nullable: true })
  orderStatus?: orderStatus;

  @Field(() => Float, { nullable: true })
  totalAmount?: number;

  @Field(() => [CreateOrderProductInput])
  orderProducts: CreateOrderProductInput[];
}
