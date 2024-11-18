import { Module } from '@nestjs/common';
import { DatosMedicosService } from './datos_medicos.service';
import { DatosMedicosController } from './datos_medicos.controller';

@Module({
  controllers: [DatosMedicosController],
  providers: [DatosMedicosService],
})
export class DatosMedicosModule {}
