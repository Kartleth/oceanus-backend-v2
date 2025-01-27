import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcontratadoDto } from './create-subcontratado.dto';
import { EstadoSubcontratado } from '../entities/subcontratado.entity';

export class UpdateSubcontratadoDto extends PartialType(
  CreateSubcontratadoDto,
) {
  nombre?: string;
  rfc?: string;
  nss?: string;
  ine?: string;
  curp?: string;
  estado?: EstadoSubcontratado;
  doc?: string;
}
