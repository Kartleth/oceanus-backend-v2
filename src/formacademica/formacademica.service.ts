import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formacademica } from './entities/formacademica.entity';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';

@Injectable()
export class FormacademicaService {
  constructor(
    @InjectRepository(Formacademica)
    private readonly formacademicaRepository: Repository<Formacademica>,
  ) {}

  async create(
    createFormacademicaDto: CreateFormacademicaDto,
  ): Promise<Formacademica> {
    const newAcademicData = this.formacademicaRepository.create(
      createFormacademicaDto,
    );
    return await this.formacademicaRepository.save(newAcademicData);
  }

  async findAll(): Promise<Formacademica[]> {
    return await this.formacademicaRepository.find({ relations: ['empleado'] });
  }

  async findOne(id: number): Promise<Formacademica> {
    return await this.formacademicaRepository.findOne({
      where: { idacademicos: id },
      relations: ['empleado'],
    });
  }

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

  async remove(id: number): Promise<void> {
    const result = await this.formacademicaRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Registro no encontrado');
    }
  }
}
