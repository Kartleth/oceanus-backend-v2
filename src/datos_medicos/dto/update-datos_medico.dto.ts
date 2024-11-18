import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosMedicoDto } from './create-datos_medico.dto';

export class UpdateDatosMedicoDto extends PartialType(CreateDatosMedicoDto) {}
