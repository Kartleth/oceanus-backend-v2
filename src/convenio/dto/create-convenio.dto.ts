import { CreateContratoDto } from 'src/contrato/dto/create-contrato.dto';

export class CreateConvenioDto {
  fechainicio: Date;
  fechafinal: Date;
  montoadicional?: number;
  documento: string;
  idContrato: number;
}
