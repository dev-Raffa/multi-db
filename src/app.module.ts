import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Customer } from './customer/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Ou outro banco de dados
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'R@f@1994',
      database: 'default', // Conexão inicial para criar os outros bancos.
      entities:[Customer],
      synchronize: true, // Usar migrations em produção
    }),
    CustomerModule, DatabaseModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
