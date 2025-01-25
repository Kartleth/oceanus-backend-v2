import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { EstadoSubcontratado } from '../entities/subcontratado.entity';
export class CreateSubcontratadoDto {
  idSubcontratado: number;

  @IsString()
  nombre: string;

  @IsString()
  @Length(12, 13)
  rfc: string;

  @IsString()
  nss: string;

  @IsString()
  ine: string;

  @IsString()
  @Length(18, 18)
  curp: string;

  @IsEnum(EstadoSubcontratado)
  estado: EstadoSubcontratado;

  @IsOptional()
  @IsString()
  doc: string;
}
