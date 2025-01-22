import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { DatabaseService } from '../database/database.service';
import { Product } from 'src/product/product.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer, 'default') // Conexão 'default' aqui!
        private customerRepository: Repository<Customer>,
        private databaseService: DatabaseService,
      ) {}
    
    async create(customerData: any): Promise<Customer> {
        const customer = this.customerRepository.create(customerData);
        await this.customerRepository.save(customer); // Salva no banco principal

        //@ts-expect-error
        const databaseName = `customer_${customer.id}`;
        await this.databaseService.createDatabaseIfNotExists(databaseName); // Cria o banco
        
        const customerConnection = await this.databaseService.getConnection(databaseName);

        try {
            await customerConnection.query(`
                CREATE TABLE IF NOT EXISTS ${Product.name} (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price NUMERIC NOT NULL
                )
            `);
            console.log(`Tabela product criada.`);
        } catch (error) {
            console.error(`Erro ao criar tabela product:`, error);
             // Rollback da transação de criação do cliente caso ocorra erro na criação da tabela
            throw error;
        }
        
        //@ts-expect-error
        return customer;
    }

    async findOne(id: number): Promise<Customer> {
        // @ts-expect-error id
        return this.customerRepository.findOne({ where: { id } });
    }
  
    // @ts-expect-error id
    async getCustomerConnection(customerId: number): Promise<DataSource> {
        const customer = await this.findOne(customerId);
        if(!customer) {
            throw new Error('Cliente não encontrado.');
        }
        const databaseName = `customer_${customer.id}`;
        return this.databaseService.getConnection(databaseName);
    }
}