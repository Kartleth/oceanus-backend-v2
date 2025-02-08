import { PartialType } from '@nestjs/mapped-types';
import { CreateContratoDto } from './create-contrato.dto';
import { CreateConvenioDto } from 'src/convenio/dto/create-convenio.dto';
import { TipoSubcontrato } from '../entities/contrato.entity';
import { CreateFianzaDto } from 'src/fianza/dto/create-fianza.dto';
import { CreateFacturaDto } from 'src/factura/dto/create-factura.dto';
import { CreateOrdenServicioDto } from 'src/orden_servicio/dto/create-orden_servicio.dto';
import { TipoPersonal } from 'src/personal_contrato/entities/personal_contrato.entity';

export class UpdateContratoDto extends PartialType(CreateContratoDto) {
  nombreContrato?: string;
  idContratante?: number;
  idContratado?: number;
  personal?: Array<{ idPersona: number; tipoPersonal: TipoPersonal }>;
  tipoSubcontrato?: TipoSubcontrato;
  iniciocontrato?: Date;
  fincontrato?: Date;
  convenio?: Array<CreateConvenioDto>;
  fianzacumplimiento?: CreateFianzaDto;
  fianzaoculto?: CreateFianzaDto;
  fianzaanticipo?: CreateFianzaDto;
  montoContrato?: number;
  anticipoContrato?: number;
  direccion?: string;
  numeroContrato?: string;
  facturas?: Array<CreateFacturaDto>;
  ordenes?: Array<CreateOrdenServicioDto>;
}
