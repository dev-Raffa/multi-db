import { Controller, Post, Body, Get, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './cutomer.dto'; 
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UsePipes(new ValidationPipe()) // Validação com DTO
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.customerService.create(createCustomerDto);
    } catch (error) {
        // Trate os erros adequadamente, por exemplo:
        console.error("Erro ao criar cliente:", error);
        throw error; // Re-lança o erro para o NestJS tratar (retornar um erro 500, por exemplo).
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer | null> {
    try {
      const customer = await this.customerService.findOne(id);
      if (!customer) {
        // Trate o caso em que o cliente não é encontrado
        // Você pode lançar uma exceção NotFoundException do NestJS, por exemplo
        // throw new NotFoundException('Cliente não encontrado');
        return null; // Ou retornar null, dependendo da sua necessidade
      }
      return customer;
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        throw error;
    }
  }

    //Rota para testar a conexão com o banco de dados do cliente
    @Get(':id/test-connection')
    async testCustomerConnection(@Param('id', ParseIntPipe) id: number) {
        try {
            const dataSource = await this.customerService.getCustomerConnection(id);
            await dataSource.query('SELECT 1'); // Executa uma query simples para testar a conexão
            return { message: 'Conexão com o banco de dados do cliente estabelecida com sucesso!' };
        } catch (error) {
            console.error("Erro ao testar a conexão com o banco de dados do cliente:", error);
            return { message: 'Erro ao testar a conexão com o banco de dados do cliente.', error: error.message };
        }
    }
}