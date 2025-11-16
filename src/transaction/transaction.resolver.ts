import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TransactionEntity } from './entity/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { DatabaseService } from 'src/database/database.service';
import { Inject } from '@nestjs/common';
import { OrderEntity } from 'src/order/entities/order.entity';

@Resolver(() => TransactionEntity)
export class TransactionResolver {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}
  @Query(() => [TransactionEntity], { name: 'transactions' })
  async findAll(): Promise<TransactionEntity[]> {
    return this.databaseService.transaction.findMany({
      include: {
        order: true,
      },
    });
  }

  @Query(() => TransactionEntity, { nullable: true })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<TransactionEntity | null> {
    return this.databaseService.transaction.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });
  }

  @Mutation(() => TransactionEntity)
  async createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ): Promise<TransactionEntity> {
    return this.databaseService.transaction.create({
      data: {
        ...createTransactionInput,
      },
      include: {
        order: true,
      },
    });
  }

  @Mutation(() => TransactionEntity)
  async updateTransaction(
    @Args('id', { type: () => String }) id: string,
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ): Promise<TransactionEntity | null> {
    return this.databaseService.transaction.update({
      where: { id },
      data: {
        ...updateTransactionInput,
      },
      include: {
        order: true,
      },
    });
  }

  @Mutation(() => Boolean)
  async removeTransaction(
    @Args('id', { type: () => String }) id: string,
  ): Promise<boolean> {
    await this.databaseService.transaction.delete({
      where: {
        id: id,
      },
    });
    return true;
  }

  @ResolveField(() => OrderEntity, { nullable: true })
  async order(
    @Parent() transaction: TransactionEntity,
  ): Promise<OrderEntity | null> {
    return this.databaseService.order.findUnique({
      where: { id: transaction.orderId },
    });
  }
}
