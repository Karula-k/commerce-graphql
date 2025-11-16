import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductResolver } from './order-product.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OrderProductService, OrderProductResolver],
})
export class OrderProductModule {}
