import { TipoCambio } from "../entities/fianza.entity";

export class CreateFianzaDto {
  documento?: string;
  tipodecambio: TipoCambio;
  inicio: Date;
  anticipodoc?: string;
  fin: Date;
  poliza?: string;
  aseguradora?: string;
  monto: number;
}
