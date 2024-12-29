import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { DatosMedico } from 'src/datos_medicos/entities/datos_medico.entity';
import { Formacademica } from 'src/formacademica/entities/formacademica.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personasRepository: Repository<Persona>,
  ) {}

  async create(data: CreatePersonaDto) {
    const datosAcademicos = plainToClass(Formacademica, data.datosAcademicos);
    const datosMedico = plainToClass(DatosMedico, data.datosMedicos);

    const persona = plainToClass(Persona, {
      ...data,
      datosAcademicos,
      datosMedico,
    });
    const result = await this.personasRepository.save(persona);
    return result;
  }

  async findAll(options?: FindManyOptions<Persona>): Promise<Persona[]> {
    return await this.personasRepository.find(options);
  }

  async findOne(id: number): Promise<Persona> {
    return await this.personasRepository.findOne({
      where: { id },
      relations: ['formacademica', 'datosmedico'],
    });
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    //Codigo para hacer update que luego se va a agregar porque ahorita se esta arreglando la BD
  }
}
