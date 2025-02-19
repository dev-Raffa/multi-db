import { Inject, Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, EntityTarget } from 'typeorm';
import { Product } from './product.entity';
import { DatabaseService } from '../database/database.service';
import { ServiceWithDataSource } from 'src/abstract/service';

@Injectable()
export class ProductService extends ServiceWithDataSource<Product> {
}