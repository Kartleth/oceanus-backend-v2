import { IsString } from 'class-validator';

export class CreateDocsubcontratadoDto {
  @IsString()
  rfc: string;

  @IsString()
  nss: string;

  @IsString()
  ine: string;

  @IsString()
  curp: string;

  @IsString()
  foto: string;
}
