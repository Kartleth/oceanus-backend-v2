import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEmail, Length, IsDate } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsString()
  razonsocial: string;

  @IsOptional()
  @IsEmail()
  correo: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  represenatelegal: string;

  @IsOptional()
  @IsEmail()
  correoRepresenatelegal: string;

  @IsOptional()
  @IsString()
  telefonoRepresenatelegal: string;

  @IsString()
  @Length(12, 13)
  rfc: string;

  @IsOptional()
  @IsEmail()
  correofacturacion: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  constanciafiscal: string;

  @IsOptional()
  @IsString()
  tiporegimen: string;

  @IsOptional()
  @IsString()
  numerocuenta: string;

  @IsOptional()
  @IsString()
  banco: string;

  @IsOptional()
  @IsString()
  nombrecontrato: string;

  @IsDate()
  @Type(() => Date)
  fechavencimientoconstancia: Date;

  @IsOptional()
  @IsString()
  nombreAdministrativo: string;

  @IsOptional()
  @IsEmail()
  correoAdministrativo: string;

  @IsOptional()
  @IsString()
  telefonoAdministrativo: string;
}
