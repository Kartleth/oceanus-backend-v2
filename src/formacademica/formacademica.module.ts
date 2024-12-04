import { Module } from '@nestjs/common';
import { FormacademicaService } from './formacademica.service';
import { FormacademicaController } from './formacademica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formacademica } from './entities/formacademica.entity';
import { Persona } from 'src/personas/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formacademica, Persona])],
  controllers: [FormacademicaController],
  providers: [FormacademicaService],
})
export class FormacademicaModule {}
