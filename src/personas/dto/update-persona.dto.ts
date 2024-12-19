import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaDto } from './create-persona.dto';
import { UpdateFormacademicaDto } from 'src/formacademica/dto/update-formacademica.dto';
import { UpdateDatosMedicoDto } from 'src/datos_medicos/dto/update-datos_medico.dto';
import { IsOptional, IsString, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  // Propiedades adicionales que no están en PartialType (debes agregarlas si las quieres actualizar)
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsDate()
  fechanacimiento?: Date;

  @IsOptional()
  @IsString()
  curp?: string;

  @IsOptional()
  @IsString()
  rfc?: string;

  @IsOptional()
  @IsString()
  numerofijo?: string;

  @IsOptional()
  @IsString()
  numerocelular?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  numerolicencia?: string;

  @IsOptional()
  @IsString()
  numeropasaporte?: string;

  @IsOptional()
  @IsDate()
  fechaingreso?: Date;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  tipocontrato?: string;

  @IsOptional()
  @IsDate()
  iniciocontrato?: Date;

  @IsOptional()
  @IsDate()
  fincontrato?: Date;

  @IsOptional()
  @IsString()
  correo?: string;

  @IsOptional()
  @IsString()
  ine?: string;

  @IsOptional()
  @IsString()
  estadocivil?: string;

  // Relación anidada con datosMedicos y datosAcademicos
  @ValidateNested()
  @Type(() => UpdateDatosMedicoDto)
  @IsOptional()
  datosMedicos?: UpdateDatosMedicoDto;

  @ValidateNested()
  @Type(() => UpdateFormacademicaDto)
  @IsOptional()
  datosAcademicos?: UpdateFormacademicaDto;
  formacademica: any;
}
