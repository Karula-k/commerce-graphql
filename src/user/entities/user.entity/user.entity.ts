import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  name?: string;
}
