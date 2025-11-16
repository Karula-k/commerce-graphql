import { Field, InputType } from '@nestjs/graphql';
import { CreateOrderInput } from 'src/order/dto/create-order.input';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
  @Field(() => [CreateOrderInput], { nullable: true })
  order?: [CreateOrderInput] | null;
}
