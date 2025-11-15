import { InputType, Field, Float } from '@nestjs/graphql';
import { orderStatus } from '@prisma/client';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  orderNumber: string;

  @Field(() => orderStatus, { nullable: true })
  orderStatus?: orderStatus;

  @Field(() => Float)
  totalAmount: number;
}
