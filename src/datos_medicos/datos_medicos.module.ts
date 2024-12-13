import { Module } from '@nestjs/common';
import { DatosMedicosService } from './datos_medicos.service';
import { DatosMedicosController } from './datos_medicos.controller';
import { DatosMedico } from './entities/datos_medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DatosMedico])],
  controllers: [DatosMedicosController],
  providers: [DatosMedicosService],
})
export class DatosMedicosModule {}
