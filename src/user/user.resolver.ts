import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { Inject } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(UserEntity)
export class UserResolver {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  @Query(() => [UserEntity], { nullable: true })
  async allUsers() {
    return this.databaseService.user.findMany();
  }

  @Query(() => UserEntity, { nullable: true })
  async getUser(@Args('id') id: string) {
    return this.databaseService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => UserEntity)
  async registerUser(@Args('data') data: CreateUserInput): Promise<UserEntity> {
    const result = await this.databaseService.user.create({
      data: {
        name: data.name,
      },
    });
    return {
      id: result.id,
      name: result.name,
    };
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('data') data: CreateUserInput,
    @Args('id') id: string,
  ): Promise<UserEntity> {
    const result = await this.databaseService.user.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
    return {
      id: result.id,
      name: result.name,
    };
  }
}
