import { Module } from '@nestjs/common';
import { FianzaCumplimientoService } from './fianza_cumplimiento.service';
import { FianzaCumplimientoController } from './fianza_cumplimiento.controller';

@Module({
  controllers: [FianzaCumplimientoController],
  providers: [FianzaCumplimientoService],
})
export class FianzaCumplimientoModule {}
