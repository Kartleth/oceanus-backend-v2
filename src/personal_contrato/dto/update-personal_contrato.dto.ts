import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalContratoDto } from './create-personal_contrato.dto';

export class UpdatePersonalContratoDto extends PartialType(CreatePersonalContratoDto) {}
