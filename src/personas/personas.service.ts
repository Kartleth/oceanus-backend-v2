import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { DatosMedico } from 'src/datos_medicos/entities/datos_medico.entity';

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

  async findAll(p0: { relations: string[] }): Promise<Persona[]> {
    return this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    return this.personaRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    await this.personaRepository.update(id, updatePersonaDto);
    return this.personaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.personaRepository.delete(id);
  }
}
