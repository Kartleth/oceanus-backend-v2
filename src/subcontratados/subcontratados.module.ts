import { Module } from '@nestjs/common';
import { SubcontratadosService } from './subcontratados.service';
import { SubcontratadosController } from './subcontratados.controller';
import { Subcontratado } from './entities/subcontratado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subcontratado])],
  controllers: [SubcontratadosController],
  providers: [SubcontratadosService],
  exports: [SubcontratadosService],
})
export class SubcontratadosModule {}
