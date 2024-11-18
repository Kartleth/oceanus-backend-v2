import { Module } from '@nestjs/common';
import { OrdenServicioService } from './orden_servicio.service';
import { OrdenServicioController } from './orden_servicio.controller';

@Module({
  controllers: [OrdenServicioController],
  providers: [OrdenServicioService],
})
export class OrdenServicioModule {}
