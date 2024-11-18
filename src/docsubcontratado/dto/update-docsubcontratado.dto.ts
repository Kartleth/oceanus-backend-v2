import { PartialType } from '@nestjs/mapped-types';
import { CreateDocsubcontratadoDto } from './create-docsubcontratado.dto';

export class UpdateDocsubcontratadoDto extends PartialType(CreateDocsubcontratadoDto) {}
