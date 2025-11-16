import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { paymentStatus } from '@prisma/client';
import { OrderEntity } from 'src/order/entities/order.entity';

registerEnumType(paymentStatus, { name: 'PaymentStatus' });

@ObjectType()
export class TransactionEntity {
  @Field(() => ID)
  id: string;

  @Field()
  orderId: string;

  @Field(() => paymentStatus)
  paymentStatus: paymentStatus;

  @Field(() => Float)
  amount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  urlString?: string | null;

  @Field(() => Date, { nullable: true })
  urlExpiry?: Date | null;

  @Field(() => OrderEntity)
  order: OrderEntity;
}
