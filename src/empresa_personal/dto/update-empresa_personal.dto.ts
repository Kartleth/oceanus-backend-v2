import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaPersonalDto } from './create-empresa_personal.dto';

export class UpdateEmpresaPersonalDto extends PartialType(CreateEmpresaPersonalDto) {}
