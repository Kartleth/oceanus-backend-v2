import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoSubcontratado } from '../entities/subcontratado.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateSubcontratadoDto {
  @PrimaryGeneratedColumn()
  idSubcontratado: number;

  @IsString()
  nombre: string;

  @IsString()
  rfc: string;

  @IsString()
  nss: string;

  @IsString()
  ine: string;

  @IsString()
  curp: string;

  @IsEnum(EstadoSubcontratado)
  estado: EstadoSubcontratado;

  @IsOptional()
  @IsString()
  doc: string;
}
