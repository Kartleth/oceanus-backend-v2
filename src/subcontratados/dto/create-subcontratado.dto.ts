import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { EstadoSubcontratado } from '../entities/subcontratado.entity';
import { Contrato } from 'src/contrato/entities/contrato.entity';

export class CreateSubcontratadoDto {
  idsubcontratado: number;

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
