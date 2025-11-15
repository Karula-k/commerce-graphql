import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { Inject } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInput } from './dto/create-user.input';
import { OrderEntity } from 'src/order/entities/order.entity';

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
        orders:
          data.order && Array.isArray(data.order)
            ? { create: data.order }
            : undefined,
      },
      include: {
        orders: true,
      },
    });

    return {
      id: result.id,
      name: result.name,
      orders: result.orders,
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
        orders:
          data.order && Array.isArray(data.order)
            ? { create: data.order }
            : undefined,
      },
      include: {
        orders: true,
      },
    });
    return {
      id: result.id,
      name: result.name,
      orders: result.orders,
    };
  }

  @ResolveField()
  async orders(@Root() user: UserEntity): Promise<OrderEntity[]> {
    return this.databaseService.order.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
