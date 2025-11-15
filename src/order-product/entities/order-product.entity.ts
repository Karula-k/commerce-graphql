import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@ObjectType()
export class OrderProductEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  orderId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => ProductEntity, { nullable: true })
  product?: ProductEntity;

  @Field(() => OrderEntity, { nullable: true })
  order?: OrderEntity;
}
