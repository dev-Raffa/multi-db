import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ControllerToServiceWithDatasource } from 'src/abstract/controller';
import { Product } from './product.entity';

@Controller(':customerId/products') 
export class ProductController extends ControllerToServiceWithDatasource<Product, ProductService> {
}