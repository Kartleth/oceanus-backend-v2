import { Module } from '@nestjs/common';
import { ConvenioService } from './convenio.service';
import { ConvenioController } from './convenio.controller';

@Module({
  controllers: [ConvenioController],
  providers: [ConvenioService],
})
export class ConvenioModule {}
