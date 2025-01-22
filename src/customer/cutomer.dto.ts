import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  // Adicione outros campos e validações conforme necessário
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;
}