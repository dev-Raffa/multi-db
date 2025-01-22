import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private connections: Map<string, DataSource> = new Map();
  private defaultOptions: DataSourceOptions;
  private defaultConnection: DataSource;

  constructor() {
    this.defaultOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'R@f@1994',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false, // Use migrations em produção
      logging: false,
    };
  }

  async onModuleInit() {
    this.defaultConnection = await this.createConnection('default');
  }

  async createDatabaseIfNotExists(databaseName: string): Promise<void> {
    try {
        await this.defaultConnection.query(`CREATE DATABASE ${databaseName}`);
        console.log(`Banco de dados ${databaseName} criado.`);
    } catch (error) {
        if(error.code !== '42P04') { // Ignora erro se o banco já existe
            console.error(`Erro ao criar banco de dados ${databaseName}:`, error);
            throw error;
        }
    }
  }

  async createConnection(name: string): Promise<DataSource> {
    if (this.connections.has(name)) {
      //@ts-expect-error 
      return this.connections.get(name);
    }

    const options = { ...this.defaultOptions, database: name };
    
    //@ts-expect-error 
    const connection = new DataSource(options);

    try {
      await connection.initialize();
      this.connections.set(name, connection);
      console.log(`Conexão ${name} criada.`);
      return connection;
    } catch (error) {
      console.error(`Erro ao criar conexão ${name}:`, error);
      throw error;
    }
  }

    getDefaultConnection(): DataSource {
        return this.defaultConnection;
    }

    async getConnection(databaseName: string): Promise<DataSource> {
        if (!this.connections.has(databaseName)) {
            await this.createDatabaseIfNotExists(databaseName);
            return this.createConnection(databaseName);
        }
      //@ts-expect-error 
      return this.connections.get(databaseName);
    }
}