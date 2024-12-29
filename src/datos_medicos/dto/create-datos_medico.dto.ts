import { IsString, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { Genero } from '../entities/datos_medico.entity';

export class CreateDatosMedicoDto {
  @IsString()
  @IsOptional()
  alergias: string;

  @IsString()
  @IsOptional()
  enfercronicas: string;

  @IsString()
  @IsOptional()
  lesiones: string;

  @IsString()
  @IsOptional()
  alergiasmed: string;

  @IsString()
  @IsNotEmpty()
  numemergencia: string;

  @IsString()
  @IsNotEmpty()
  numseguro: string;

  @IsString()
  @IsNotEmpty()
  tiposangre: string;

  @IsString()
  @IsOptional()
  nombremergencia: string;

  @IsEnum(Genero)
  @IsOptional()
  genero: Genero;

  @IsString()
  @IsOptional()
  relaemergencia: string;
}
