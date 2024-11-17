import { PartialType } from '@nestjs/mapped-types';
import { CreateFianzaAnticipoDto } from './create-fianza_anticipo.dto';

export class UpdateFianzaAnticipoDto extends PartialType(CreateFianzaAnticipoDto) {}
