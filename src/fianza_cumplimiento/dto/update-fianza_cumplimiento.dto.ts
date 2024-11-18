import { PartialType } from '@nestjs/mapped-types';
import { CreateFianzaCumplimientoDto } from './create-fianza_cumplimiento.dto';

export class UpdateFianzaCumplimientoDto extends PartialType(CreateFianzaCumplimientoDto) {}
