import { Module } from '@nestjs/common';
import { FormacademicaService } from './formacademica.service';
import { FormacademicaController } from './formacademica.controller';
import { Formacademica } from './entities/formacademica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Formacademica])],
  controllers: [FormacademicaController],
  providers: [FormacademicaService],
})
export class FormacademicaModule {}
