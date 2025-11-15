import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(ProductEntity)
export class ProductResolver {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  @Query(() => [ProductEntity], { nullable: true })
  async getProducts(): Promise<ProductEntity[]> {
    return this.databaseService.product.findMany();
  }

  @Query(() => ProductEntity, { nullable: true })
  async getProduct(@Args('id') id: string): Promise<ProductEntity | null> {
    return this.databaseService.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => ProductEntity)
  async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<ProductEntity> {
    return this.databaseService.product.create({ data });
  }

  @Mutation(() => ProductEntity, { nullable: true })
  async updateProduct(
    @Args('data') data: UpdateProductInput,
  ): Promise<ProductEntity | null> {
    const { id, ...updateData } = data;
    return this.databaseService.product.update({
      where: { id },
      data: updateData,
    });
  }
}
