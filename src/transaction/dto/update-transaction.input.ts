import { InputType, Field, Float } from '@nestjs/graphql';
import { paymentStatus } from '@prisma/client';

@InputType()
export class UpdateTransactionInput {
  @Field({ nullable: true })
  paymentStatus?: paymentStatus;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  urlString?: string;

  @Field({ nullable: true })
  urlExpiry?: Date;
}
