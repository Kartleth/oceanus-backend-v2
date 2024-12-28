import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { DatosMedicosService } from 'src/datos_medicos/datos_medicos.service';
import { FormacademicaService } from 'src/formacademica/formacademica.service';
import { Formacademica } from 'src/formacademica/entities/formacademica.entity';
import { DatosMedico } from 'src/datos_medicos/entities/datos_medico.entity';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService, DatosMedicosService, FormacademicaService],
})
export class PersonasModule {}
