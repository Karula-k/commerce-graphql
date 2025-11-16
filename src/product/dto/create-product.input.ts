import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  stock: number;
}
