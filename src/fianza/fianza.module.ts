import { Module } from '@nestjs/common';
import { FianzaService } from './fianza.service';
import { FianzaController } from './fianza.controller';

@Module({
  controllers: [FianzaController],
  providers: [FianzaService],
})
export class FianzaModule {}
