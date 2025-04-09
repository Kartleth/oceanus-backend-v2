import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateContratoDto } from './create-contrato.dto';

export class UpdateContratoDto extends PartialType(
  OmitType(CreateContratoDto, [
    'fianzaAnticipo',
    'fianzaCumplimiento',
    'fianzaOculto',
    'facturas',
    'ordenes',
    'convenio',
  ]),
) {}
