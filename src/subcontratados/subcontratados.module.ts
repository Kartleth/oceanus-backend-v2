import { Module } from '@nestjs/common';
import { SubcontratadosService } from './subcontratados.service';
import { SubcontratadosController } from './subcontratados.controller';
import { Subcontratado } from './entities/subcontratado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcontratado, Empresa])],
  controllers: [SubcontratadosController],
  providers: [SubcontratadosService],
  exports: [SubcontratadosService],
})
export class SubcontratadosModule {}
