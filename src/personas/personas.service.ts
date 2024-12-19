import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const newPersona = this.personaRepository.create(createPersonaDto);
    return this.personaRepository.save(newPersona);
  }

  async findAll(options?: FindManyOptions<Persona>): Promise<Persona[]> {
    return await this.personaRepository.find(options);
  }

  async findOne(id: number): Promise<Persona> {
    return await this.personaRepository.findOne({
      where: { id },
      relations: ['formacademica', 'datosmedico'],
    });
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    // Cambiar la forma de llamar a findOne()
    const persona = await this.personaRepository.findOne({
      where: { id }, // Filtra por ID
      relations: ['formacademica', 'datosmedico'], // Relacionar formacademica y datosmedico
    });

    if (!persona) {
      throw new Error('Persona no encontrada');
    }

    // Actualizar datos de Persona
    if (updatePersonaDto.datosAcademicos) {
      // Aquí actualizas la formación académica
      if (persona.datosAcademicos) {
        persona.datosAcademicos = {
          ...persona.datosAcademicos,
          ...updatePersonaDto.datosAcademicos,
        };
      }
    }

    // Actualizar datos médicos
    if (updatePersonaDto.datosMedicos) {
      if (persona.datosMedicos) {
        persona.datosMedicos = {
          ...persona.datosMedicos,
          ...updatePersonaDto.datosMedicos,
        };
      }
    }

    // Actualizar persona
    Object.assign(persona, updatePersonaDto);
    return this.personaRepository.save(persona);
  }

  async remove(id: number): Promise<void> {
    const persona = await this.personaRepository.findOne({
      where: { id },
    });

    if (!persona) {
      throw new Error('Persona no encontrada');
    }

    await this.personaRepository.remove(persona);
  }
}
