import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface ICustomer {
    id: number;
    name: string;  
}


@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}