import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';
import { FianzaModule } from 'src/fianza/fianza.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contrato,
      Cliente,
      Persona,
      Fianza,
      Factura,
      Convenio,
      OrdenServicio,
      PersonalContrato,
    ]),
    FianzaModule,
  ],
  controllers: [ContratoController],
  providers: [ContratoService],
  exports: [ContratoService],
})
export class ContratoModule {}
