import { Inject, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BaseEntity, DataSource, DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';

export class ServiceWithDataSource<E extends ObjectLiteral> {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject('ENTITY')
    private readonly entity: EntityTarget<E>
  ) {}

  protected async verifyId(dataSource: DataSource, id: number | string) {
    // @ts-expect-error id is not assignable
    return await dataSource.manager.findBy(this.entity, { id: id });
  }

  protected async getDatasource(database: string): Promise<DataSource> {
    return await this.databaseService.getConnection(database);
  }
  async add(databaseName: string, productData: DeepPartial<E>): Promise<E> {
    const dataSource: DataSource = await this.getDatasource(databaseName);
    const newProduct: E = dataSource.manager.create(this.entity, productData);

    return dataSource.manager.save<E>(newProduct);
  }

  async getAll(databaseName: string): Promise<E[]> {
    const dataSource: DataSource = await this.getDatasource(databaseName);
    
    return dataSource.manager.find(this.entity);
  }

  async getOneById(databaseName: string, id: number | string): Promise<E> {
    const dataSource: DataSource = await this.getDatasource(databaseName);
    
    // @ts-expect-error id is not assignable
    const result = await dataSource.manager.findOneBy(this.entity, { id: id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(database: string, id: string | number, args: DeepPartial<E>): Promise<E> {
    const dataSource = await this.getDatasource(database);
    const verific = await this.verifyId(dataSource, id);

    if (!verific) {
      throw new NotFoundException();
    }

    // @ts-expect-error args is not assignable
    await dataSource.manager.update(this.entity, id, args);

    // @ts-expect-error id is not assignable
    return await dataSource.manager.findOneBy({ id: +id });
  }

  async delete(database: string, id: number): Promise<E[]> {
     const dataSource = await this.getDatasource(database);
     const verific = await this.verifyId(dataSource, id);

    if (!verific) {
      throw new NotFoundException();
    }

    await dataSource.manager.delete(this.entity, id);

    return await dataSource.manager.find(this.entity);
  }
}
