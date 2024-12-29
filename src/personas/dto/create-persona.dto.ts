import {
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';
import { CreateDatosMedicoDto } from 'src/datos_medicos/dto/create-datos_medico.dto';
import { CreateFormacademicaDto } from 'src/formacademica/dto/create-formacademica.dto';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  fechanacimiento: Date;

  @IsString()
  curp: string;

  @IsString()
  rfc: string;

  @IsString()
  numerofijo: string;

  @IsString()
  numerocelular: string;

  @IsString()
  direccion: string;

  @IsString()
  numerolicencia: string;

  @IsString()
  numeropasaporte: string;

  @IsDateString()
  fechaingreso: Date;

  @IsString()
  estado: string;

  @IsString()
  tipocontrato: string;

  @IsDateString()
  iniciocontrato: Date;

  @IsDateString()
  fincontrato: Date;

  @IsString()
  correo: string;

  @IsString()
  ine: string;

  @IsString()
  estadocivil: string;

  @IsOptional()
  datosMedicos: CreateDatosMedicoDto;
  @IsOptional()
  datosAcademicos: CreateFormacademicaDto;
}

export type CreatePersonaDatosCompletosDto = {
  datosPersonales: CreatePersonaDto;
  datosMedicos: CreateDatosMedicoDto;
  datosAcademicos: CreateFormacademicaDto;
};
