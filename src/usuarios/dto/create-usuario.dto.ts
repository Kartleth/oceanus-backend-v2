import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserType } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  usuario: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserType)
  type: UserType;
}
