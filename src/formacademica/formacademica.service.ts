import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formacademica } from './entities/formacademica.entity';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';
import { Persona } from 'src/personas/entities/persona.entity';

@Injectable()
export class FormacademicaService {
  constructor(
    @InjectRepository(Formacademica)
    private formacademicaRepository: Repository<Formacademica>,
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>, // Repositorio para buscar Persona
  ) {}
  // Crear un nuevo registro en la tabla Formacademica
  async create(
    createFormacademicaDto: CreateFormacademicaDto,
  ): Promise<Formacademica> {
    const { empleado, ...formacademicaData } = createFormacademicaDto;

    // Busca a la persona por su ID
    const persona = await this.personaRepository.findOne({
      where: { id: empleado.id },
    });

    if (!persona) {
      throw new Error('La persona no existe');
    }

    // Crea el registro de Formacademica asociado
    const formacademica = this.formacademicaRepository.create({
      ...formacademicaData,
      empleado: persona,
    });

    return await this.formacademicaRepository.save(formacademica);
  }

  // Obtener todos los registros de Formacademica
  async findAll(): Promise<Formacademica[]> {
    return await this.formacademicaRepository.find({ relations: ['empleado'] });
  }

  // Obtener un registro específico de Formacademica
  async findOne(id: number): Promise<Formacademica> {
    return await this.formacademicaRepository.findOne({
      where: { idacademicos: id },
      relations: ['empleado'],
    });
  }

  // Actualizar un registro de Formacademica
  async update(
    id: number,
    updateFormacademicaDto: UpdateFormacademicaDto,
  ): Promise<Formacademica> {
    const formacademica = await this.formacademicaRepository.findOne({
      where: { idacademicos: id },
    });

    if (!formacademica) {
      throw new Error('Registro no encontrado');
    }

    Object.assign(formacademica, updateFormacademicaDto);

    return await this.formacademicaRepository.save(formacademica);
  }

  // Eliminar un registro de Formacademica
  async remove(id: number): Promise<void> {
    const result = await this.formacademicaRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Registro no encontrado');
    }
  }
}
