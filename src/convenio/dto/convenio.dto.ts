import { Contrato } from 'src/contrato/entities/contrato.entity';

export class ConvenioDto {
  idconvenio: number;
  fechainicio: Date;
  fechafinal: Date;
  montoadicional?: number;
  documento: string;
  contrato: Contrato;
}
