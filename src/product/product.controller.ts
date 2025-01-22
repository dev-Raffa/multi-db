import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CustomerService } from '../customer/customer.service';

@Controller('products') // Rota base para produtos
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly customerService: CustomerService
  ) {}

  @Post(':customerId') // POST /products/:customerId
  async create(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() createProductDto: any,
  ) {
    return this.productService.create(customerId, createProductDto);
  }

    /*
    @Get(':customerId')
    async getProducts(@Param('customerId', ParseIntPipe) customerId: number){
        const customerConnection = await this.customerService.getCustomerConnection(customerId);
        const schemaName = `customer_${customerId}`;
        await this.productService.setConnection(customerConnection, schemaName);
        return customerConnection.getRepository(Product).find();
    }
    */
}