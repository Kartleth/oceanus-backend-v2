import { Module } from '@nestjs/common';
import { DocsubcontratadoService } from './docsubcontratado.service';
import { DocsubcontratadoController } from './docsubcontratado.controller';

@Module({
  controllers: [DocsubcontratadoController],
  providers: [DocsubcontratadoService],
})
export class DocsubcontratadoModule {}
