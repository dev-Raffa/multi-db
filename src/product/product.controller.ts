import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller(':customerId/products') // Rota base para produtos
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  @Post() // POST /products/:customerId
  async create(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() createProductDto: any,
  ) {
    return this.productService.add(`customer_${customerId}`, createProductDto);
  }

    @Get()
    async getProducts(@Param('customerId', ParseIntPipe) customerId: number){
      return this.productService.getAll(`customer_${customerId}`);
    }
}