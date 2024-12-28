import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosMedicoDto } from './create-datos_medico.dto';
import { Genero } from '../entities/datos_medico.entity';

export class UpdateDatosMedicoDto extends PartialType(CreateDatosMedicoDto) {
  alergias?: string;
  enfercronicas?: string;
  lesiones?: string;
  alergiasmed?: string;
  numemergencia?: string;
  numseguro?: string;
  tiposangre?: string;
  nombremergencia?: string;
  genero?: Genero;
  relaemergencia?: string;
}
