import { TipoPersonal } from 'src/personal_contrato/entities/personal_contrato.entity';
import { TipoSubcontrato } from '../entities/contrato.entity';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';

export class CreateContratoDto {
  nombreContrato: string;
  idContratante: number;
  idContratado: number;
  personal: Array<{ idPersona: number; tipoPersonal: TipoPersonal }>;
  tipoSubcontrato?: TipoSubcontrato;
  inicioContrato: Date;
  finContrato: Date;
  convenio?: Array<Convenio>;
  fianza?: Array<Fianza>;
  montoContrato: number;
  anticipoContrato: number;
  direccion: string;
}
