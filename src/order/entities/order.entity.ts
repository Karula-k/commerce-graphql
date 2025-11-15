import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { orderStatus } from '@prisma/client';

registerEnumType(orderStatus, { name: 'OrderStatus' });

@ObjectType()
export class OrderEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  orderNumber: string;

  @Field(() => orderStatus)
  orderStatus: orderStatus;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
