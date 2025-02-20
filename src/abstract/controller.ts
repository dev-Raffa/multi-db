import {
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Inject,
  Patch,
  Delete
} from '@nestjs/common';
import { ServiceWithDataSource } from './service';
import { DeepPartial, ObjectLiteral } from 'typeorm';

export class ControllerToServiceWithDatasource<T extends ObjectLiteral, S> {
  constructor(
    @Inject('SERVICE') private readonly service: ServiceWithDataSource<T> & S
  ) {}

  @Post()
  async create(
    @Param('customerId') customerId: string,
    @Body() createProductDto: any
  ) {
    return this.service.add(`customer_${customerId}`, createProductDto);
  }

  @Get()
  async getProducts(@Param('customerId') customerId: string) {
    return this.service.getAll(`customer_${customerId}`);
  }

  @Get(':id')
  async findOne(
    @Param('customerId') customerId: string,
    @Param('id', ParseIntPipe) id: string
  ): Promise<T> {
    return await this.service.getOneById(`customer_${customerId}`, +id);
  }

  @Patch(':id')
  async update(
    @Param('customerId') customerId: string,
    @Param('id', ParseIntPipe) id: string,
    @Body() updateArgs: DeepPartial<T>
  ): Promise<T> {
    return await this.service.update(`customer_${customerId}`, +id, updateArgs);
  }

  @Delete(':id')
  async delete(
    @Param('customerId') customerId: string,
    @Param('id', ParseIntPipe) id: string
  ): Promise<T[]> {
    return await this.service.delete(`customer_${customerId}`, +id);
  }
}
