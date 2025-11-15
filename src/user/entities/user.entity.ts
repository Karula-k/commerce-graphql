import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => String)
  id: string;

  @Field()
  name: string;
}
