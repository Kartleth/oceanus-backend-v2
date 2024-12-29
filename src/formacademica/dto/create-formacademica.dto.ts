import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFormacademicaDto {
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsString()
  @IsNotEmpty()
  carrera: string;

  @IsString()
  @IsOptional()
  explaboral: string;

  @IsString()
  @IsOptional()
  certificaciones: string;

  @IsString()
  @IsOptional()
  gradoestudios: string;
}
