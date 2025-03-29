import { PartialType } from '@nestjs/mapped-types';
import { CreateFianzaDto } from './create-fianza.dto';
import { TipoCambio } from '../entities/fianza.entity';

export class UpdateFianzaDto extends PartialType(CreateFianzaDto) {
  documento?: string;
  tipodecambio?: TipoCambio;
  inicio?: Date;
  anticipodoc?: string;
  fin?: Date;
  poliza?: string;
  aseguradora?: string;
  monto?: number;
}
