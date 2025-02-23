import { Module } from '@nestjs/common';
import { ConvenioService } from './convenio.service';
import { ConvenioController } from './convenio.controller';
import { Convenio } from './entities/convenio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Convenio])],
  controllers: [ConvenioController],
  providers: [ConvenioService],
})
export class ConvenioModule {}
