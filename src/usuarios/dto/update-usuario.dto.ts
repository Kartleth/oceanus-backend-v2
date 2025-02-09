import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { UserType } from '../entities/usuario.entity';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsString()
  @MaxLength(25)
  usuario?: string;
  @IsString()
  password?: string;
  @IsEnum(UserType)
  type?: UserType;
}
