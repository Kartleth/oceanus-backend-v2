import { TipoPersonal } from 'src/personal_contrato/entities/personal_contrato.entity';
import { TipoSubcontrato } from '../entities/contrato.entity';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { CreateConvenioDto } from 'src/convenio/dto/create-convenio.dto';
import { CreateFacturaDto } from 'src/factura/dto/create-factura.dto';
import { CreateOrdenServicioDto } from 'src/orden_servicio/dto/create-orden_servicio.dto';
import { CreateFianzaDto } from 'src/fianza/dto/create-fianza.dto';

export class CreateContratoDto {
  nombreContrato: string;
  idContratante: number;
  idContratado: number;
  iniciocontrato?: Date;
  fincontrato: Date;
  montoContrato: number;
  anticipoContrato: number;
  direccion: string;
  numeroContrato?: string;

  tipoSubcontrato?: TipoSubcontrato;
  personal: Array<{ idPersona: number; tipoPersonal: TipoPersonal }>;
  convenio?: Array<CreateConvenioDto>;
  fianzaCumplimiento?: CreateFianzaDto;
  fianzaOculto?: CreateFianzaDto;
  fianzaAnticipo?: CreateFianzaDto;
  facturas?: Array<CreateFacturaDto>;
  ordenes?: Array<CreateOrdenServicioDto>;
}
