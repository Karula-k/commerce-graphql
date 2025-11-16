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
  async getProducts(
    @Args('name', { nullable: true }) name?: string,
    @Args('category', { nullable: true }) category?: string,
    @Args('minPrice', { nullable: true }) minPrice?: number,
    @Args('maxPrice', { nullable: true }) maxPrice?: number,
  ): Promise<ProductEntity[]> {
    const where: {
      name?: { contains: string; mode: 'insensitive' };
      category?: { equals: string; mode: 'insensitive' };
      price?: { gte?: number; lte?: number };
    } = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (category) where.category = { equals: category, mode: 'insensitive' };
    if (minPrice !== undefined || maxPrice !== undefined) {
      const price: Record<string, number> = {};
      if (minPrice !== undefined && minPrice !== null) price.gte = minPrice;
      if (maxPrice !== undefined && maxPrice !== null) price.lte = maxPrice;
      if (Object.keys(price).length > 0) {
        where.price = price;
      }
    }
    return this.databaseService.product.findMany({ where });
  }
  @Mutation(() => Boolean)
  async removeProduct(@Args('id') id: string): Promise<boolean> {
    await this.databaseService.product.delete({ where: { id } });
    return true;
  }

  @Query(() => ProductEntity, { nullable: true })
  async getProduct(@Args('id') id: string): Promise<ProductEntity | null> {
    return this.databaseService.product.findUnique({
      where: { id },
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
