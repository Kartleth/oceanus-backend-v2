import { Injectable } from '@nestjs/common';
import { CreatePersonaDatosCompletosDto } from './dto/create-persona.dto';
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
    @InjectRepository(DatosMedico)
    private readonly datosMedicosRepository: Repository<DatosMedico>,
    @InjectRepository(Formacademica)
    private readonly formacademicaRepository: Repository<Formacademica>,
  ) {}

  async create(data: CreatePersonaDatosCompletosDto) {
    const { datosPersonales, datosMedicos, datosAcademicos } = data;

    // Crear la persona con los datos personales
    const persona = this.personasRepository.create(datosPersonales);
    const savedPersona = await this.personasRepository.save(persona);

    // Guardar los datos médicos si existen
    if (datosMedicos) {
      const datosMedicosEntity = this.datosMedicosRepository.create({
        ...datosMedicos,
        idmedicos: savedPersona.id, // Asumimos que tienes una columna personaId en DatosMedico
      });
      await this.datosMedicosRepository.save(datosMedicosEntity);
    }

    // Guardar los datos académicos si existen
    if (datosAcademicos) {
      const datosAcademicosEntity = this.formacademicaRepository.create({
        ...datosAcademicos,
        idacademicos: savedPersona.id, // Asumimos que tienes una columna personaId en Formacademica
      });
      await this.formacademicaRepository.save(datosAcademicosEntity);
    }

    return savedPersona;
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

  async remove(id: number): Promise<void> {
    const result = await this.personasRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Persona no encontrado');
    }
  }
}
