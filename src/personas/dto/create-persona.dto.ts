import { CreateDatosMedicoDto } from 'src/datos_medicos/dto/create-datos_medico.dto';
import { CreateFormacademicaDto } from 'src/formacademica/dto/create-formacademica.dto';

export class CreatePersonaDto {
  datosMedicos: CreateDatosMedicoDto;
  datosAcademicos: CreateFormacademicaDto;
  nombre: string;
  fechanacimiento: Date;
  curp: string;
  rfc: string;
  numerofijo: string;
  numerocelular: string;
  direccion: string;
  numerolicencia: string;
  numeropasaporte: string;
  fechaingreso: Date;
  estado: string;
  tipocontrato: string;
  iniciocontrato: Date;
  fincontrato: Date;
  correo: string;
  ine: string;
  estadocivil: string;
}

export type CreatePersona = {
  datosPersonales: CreatePersonaDto;
  datosMedicos: CreateDatosMedicoDto;
  datosAcademicos: CreateFormacademicaDto;
};
