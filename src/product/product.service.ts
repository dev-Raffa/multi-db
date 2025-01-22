import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './product.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductService {
    constructor(private readonly databaseService: DatabaseService){}

    async create(customerId: number, productData: any): Promise<Product> {
        const dataSource = await this.databaseService.getConnection(`customer_${customerId}`);

        const result = await dataSource
            .createQueryBuilder()
            .insert()
            .into(Product) // Nome da tabela COM esquema
            .values(productData)
            .returning('*')
            .execute();

        return result.generatedMaps[0] as Product;
    }

    /*
    async findAll(customerId: number): Promise<Product[]> {
        const dataSource = await this.databaseService.getConnection(`customer_${customerId}`);
        return dataSource
            .createQueryBuilder(Product, 'product') // Alias 'product' para a tabela
            .from(Product, Product.getTableName(schemaName)) // Nome da tabela COM esquema
            .getMany();
    }
    */
}