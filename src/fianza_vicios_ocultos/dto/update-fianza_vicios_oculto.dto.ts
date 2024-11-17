import { PartialType } from '@nestjs/mapped-types';
import { CreateFianzaViciosOcultoDto } from './create-fianza_vicios_oculto.dto';

export class UpdateFianzaViciosOcultoDto extends PartialType(CreateFianzaViciosOcultoDto) {}
