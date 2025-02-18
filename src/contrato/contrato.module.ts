import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { Empresa } from 'src/empresa/entities/cliente.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contrato,
      Empresa,
      Persona,
      Fianza,
      Factura,
      Convenio,
      OrdenServicio,
      PersonalContrato
    ]),
  ],
  controllers: [ContratoController],
  providers: [ContratoService],
})
export class ContratoModule {}
