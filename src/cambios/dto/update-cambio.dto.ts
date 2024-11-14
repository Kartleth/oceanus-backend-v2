import { PartialType } from '@nestjs/mapped-types';
import { CreateCambioDto } from './create-cambio.dto';

export class UpdateCambioDto extends PartialType(CreateCambioDto) {}
