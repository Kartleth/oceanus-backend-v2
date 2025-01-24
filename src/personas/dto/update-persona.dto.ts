import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaDto } from './create-persona.dto';
import { UpdateFormacademicaDto } from 'src/formacademica/dto/update-formacademica.dto';
import { UpdateDatosMedicoDto } from 'src/datos_medicos/dto/update-datos_medico.dto';

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
  // Campos de datos médicos y formación académica
  formacademica?: UpdateFormacademicaDto;
  datosMedico?: UpdateDatosMedicoDto;
}
