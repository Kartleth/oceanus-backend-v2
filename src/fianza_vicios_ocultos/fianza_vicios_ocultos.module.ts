import { Module } from '@nestjs/common';
import { FianzaViciosOcultosService } from './fianza_vicios_ocultos.service';
import { FianzaViciosOcultosController } from './fianza_vicios_ocultos.controller';

@Module({
  controllers: [FianzaViciosOcultosController],
  providers: [FianzaViciosOcultosService],
})
export class FianzaViciosOcultosModule {}
