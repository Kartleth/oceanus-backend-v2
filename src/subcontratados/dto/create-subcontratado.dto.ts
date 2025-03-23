import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { EstadoSubcontratado } from '../entities/subcontratado.entity';

export class CreateSubcontratadoDto {
  idSubcontratado: number;

  @IsString()
  nombre: string;

  @Length(12, 13)
  @IsString()
  rfc: string;

  @IsString()
  nss: string;

  @IsString()
  ine: string;

  @Length(17, 18)
  @IsString()
  curp: string;

  @IsEnum(EstadoSubcontratado)
  estado: EstadoSubcontratado;

  @IsOptional()
  @IsString()
  doc: string;

  idContrato: number;
}
