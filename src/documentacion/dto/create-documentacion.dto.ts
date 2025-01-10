import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentacionDto {
  @IsString()
  @IsOptional()
  credencial: string;

  @IsString()
  @IsOptional()
  licencia: string;

  @IsString()
  @IsOptional()
  pasaporte: string;

  @IsString()
  @IsOptional()
  cv: string;

  @IsString()
  @IsOptional()
  curp: string;

  @IsString()
  @IsOptional()
  inss: string;

  @IsString()
  @IsOptional()
  constanciasat: string;

  @IsString()
  @IsOptional()
  foto: string;

  @IsString()
  @IsOptional()
  actnacimiento: string;

  @IsString()
  @IsOptional()
  estcuenta: string;

  @IsString()
  @IsOptional()
  altasegsocial: string;

  @IsString()
  @IsOptional()
  cedulaprofe: string;

  @IsString()
  @IsOptional()
  copiacontrato: string;

  @IsString()
  @IsOptional()
  comprodomicilio: string;
}
