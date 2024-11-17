import { PartialType } from '@nestjs/mapped-types';
import { CreateFianzaDto } from './create-fianza.dto';

export class UpdateFianzaDto extends PartialType(CreateFianzaDto) {}
