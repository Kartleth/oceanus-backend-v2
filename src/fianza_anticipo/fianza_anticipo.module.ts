import { Module } from '@nestjs/common';
import { FianzaAnticipoService } from './fianza_anticipo.service';
import { FianzaAnticipoController } from './fianza_anticipo.controller';

@Module({
  controllers: [FianzaAnticipoController],
  providers: [FianzaAnticipoService],
})
export class FianzaAnticipoModule {}
