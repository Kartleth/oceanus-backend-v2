import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaDto } from './create-persona.dto';

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  nombre?: string;
  fechanacimiento?: Date;
  curp?: string;
  rfc?: string;
  numerofijo?: string;
  numerocelular?: string;
  direccion?: string;
  numerolicencia?: string;
  numeropasaporte?: string;
  fechaingreso?: Date;
  estado?: string;
  tipocontrato?: string;
  iniciocontrato?: Date;
  fincontrato?: Date;
  correo?: string;
  ine?: string;
  estadocivil?: string;
}
