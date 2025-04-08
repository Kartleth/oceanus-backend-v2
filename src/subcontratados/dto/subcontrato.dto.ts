import { Contrato } from 'src/contrato/entities/contrato.entity';
import { EstadoSubcontratado } from '../entities/subcontratado.entity';

export class SubcontratoDto {
  idsubcontratado: number;
  contrato: Contrato;
  nombre: string;
  rfc: string;
  nss: string;
  ine: string;
  curp: string;
  estado: EstadoSubcontratado;
  doc: string;
}
