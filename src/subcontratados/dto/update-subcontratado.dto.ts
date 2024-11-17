import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcontratadoDto } from './create-subcontratado.dto';

export class UpdateSubcontratadoDto extends PartialType(CreateSubcontratadoDto) {}
