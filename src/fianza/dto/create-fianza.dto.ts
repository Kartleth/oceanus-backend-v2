import { TipoCambio, TipoFianza } from '../entities/fianza.entity';

export class CreateFianzaDto {
  tipo: TipoFianza;
  documento?: string;
  tipodecambio: TipoCambio;
  inicio: Date;
  anticipodoc?: string;
  fin: Date;
  poliza?: string;
  aseguradora?: string;
  monto: number;
}
