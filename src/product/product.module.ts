import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Product } from './product.entity';


@Module({
  imports: [DatabaseModule],
  providers: [
    ProductService,
    {
      provide: 'ENTITY',
      useValue: Product
    }
  ],
  controllers: [ProductController]
})
export class ProductModule {}
