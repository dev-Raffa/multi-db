import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer], 'default'), // Conexão 'default' aqui!
    DatabaseModule
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports:[CustomerService]
})
export class CustomerModule {}