import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CustomerModule, DatabaseModule],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
