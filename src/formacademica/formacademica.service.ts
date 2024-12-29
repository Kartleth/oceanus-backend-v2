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

  async create(data: CreateFormacademicaDto): Promise<Formacademica> {
    const nuevaFormacionAcademica = this.formacademicaRepository.create(data);
    return await this.formacademicaRepository.save(nuevaFormacionAcademica);
  }

  async findAll(): Promise<Formacademica[]> {
    return await this.formacademicaRepository.find();
  }

  async findOne(id: number): Promise<Formacademica> {
    return await this.formacademicaRepository.findOne({
      where: { idacademicos: id },
    });
  }

  async update(p0: number, updateFormacademicaDto: UpdateFormacademicaDto) {
    //luego se va a hacer
  }

  remove(id: number) {
    return `This action removes a #${id} formacademica`;
  }
}
