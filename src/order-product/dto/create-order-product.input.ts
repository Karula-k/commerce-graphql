import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderProductInput {
  @Field(() => String)
  orderId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
