import { PartialType } from '@nestjs/mapped-types';
import { CreateFormacademicaDto } from './create-formacademica.dto';

export class UpdateFormacademicaDto extends PartialType(
  CreateFormacademicaDto,
) {
  cedula?: string;
  carrera?: string;
  explaboral?: string;
  certificaciones?: string;
  gradoestudios?: string;
}
