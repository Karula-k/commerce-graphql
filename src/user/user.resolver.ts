import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity/user.entity';
import { Inject } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInput } from './dto/create-user.input/create-user.input';

@Resolver(UserEntity)
export class UserResolver {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  @Query((returns) => [UserEntity], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.databaseService.user.findMany();
  }

  @Mutation((returns) => UserEntity)
  async registerUser(
    @Args('data') data: CreateUserInput,
    @Context() ctx,
  ): Promise<UserEntity> {
    const result = await this.databaseService.user.create({
      data: {
        name: data.name,
      },
    });
    return {
      id: result.id,
      name: result.name ?? undefined,
    };
  }

  @Mutation((returns) => UserEntity)
  async updateUser(
    @Args('data') data: CreateUserInput,
    @Args('id') id: string,
    @Context() ctx,
  ): Promise<UserEntity> {
    const result = await this.databaseService.user.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
    return {
      id: result.id,
      name: result.name ?? undefined,
    };
  }
}
