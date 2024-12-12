import { CreateDatosMedicoDto } from 'src/datos_medicos/dto/create-datos_medico.dto';
import { CreateFormacademicaDto } from 'src/formacademica/dto/create-formacademica.dto';

export class CreatePersonaDto {
  name: string;
  fechaNacimiento: string;
  curp: string;
  rfc: string;
  clave: string;
  estadoCivil: string;
  numeroCasa: string;
  numeroCelular: string;
  correoElectronico: string;
  direccion: string;
  numeroLicencia: string;
  numeroPasaporte: string;
  fechaIngreso: string;
  tipoContrato: string;
  estadoEmpleado: string;
  fechaInicioContrato: string;
  fechaFinContrato: string;
}

export type CreatePersona = {
  datosPersonales: CreatePersonaDto;
  datosMedicos: CreateDatosMedicoDto;
  datosAcademicos: CreateFormacademicaDto;
};
