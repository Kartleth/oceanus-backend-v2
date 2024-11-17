import { Module } from '@nestjs/common';
import { SubcontratadosService } from './subcontratados.service';
import { SubcontratadosController } from './subcontratados.controller';

@Module({
  controllers: [SubcontratadosController],
  providers: [SubcontratadosService],
})
export class SubcontratadosModule {}
