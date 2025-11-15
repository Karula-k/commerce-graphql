import { InputType, Field, Float } from '@nestjs/graphql';
import { paymentStatus } from '@prisma/client';

@InputType()
export class CreateTransactionInput {
  @Field()
  orderId: string;

  @Field(() => paymentStatus, { nullable: true })
  paymentStatus?: paymentStatus;

  @Field(() => Float)
  amount: number;

  @Field({ nullable: true })
  urlString?: string;

  @Field({ nullable: true })
  urlExpiry?: Date;
}
