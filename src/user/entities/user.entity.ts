import { Field, ObjectType } from '@nestjs/graphql';
import { OrderEntity } from 'src/order/entities/order.entity';

@ObjectType()
export class UserEntity {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field(() => [OrderEntity], { nullable: 'itemsAndList' })
  orders?: OrderEntity[] | [];
}
