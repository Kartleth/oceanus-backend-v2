import { Module } from '@nestjs/common';
import { DocsubcontratadoService } from './docsubcontratado.service';
import { DocsubcontratadoController } from './docsubcontratado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docsubcontratado } from './entities/docsubcontratado.entity';
import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docsubcontratado, Subcontratado])],
  providers: [DocsubcontratadoService],
  controllers: [DocsubcontratadoController],
  exports: [DocsubcontratadoService],
})
export class DocsubcontratadoModule {}
