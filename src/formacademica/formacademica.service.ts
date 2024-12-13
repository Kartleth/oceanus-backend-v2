import { Injectable } from '@nestjs/common';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';
import { Formacademica } from './entities/formacademica.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/personas/entities/persona.entity';

@Injectable()
export class FormacademicaService {
  constructor(
    @InjectRepository(Formacademica)
    private academicaRepository: Repository<Formacademica>,
  ) {}
  async create(data: CreateFormacademicaDto, persona: Persona) {
    const datosAcademicos: Partial<Formacademica> = {
      carrera: data.carrera,
      cedula: data.cadulaProfesional,
      certificaciones: data.certificaciones,
      explaboral: data.experienciaLaboral,
      gradoestudios: data.gradosEstudios,
      empleado: persona,
    };
    return await this.academicaRepository.save(datosAcademicos);
  }

  findAll() {
    return `This action returns all formacademica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formacademica`;
  }

  update(id: number, updateFormacademicaDto: UpdateFormacademicaDto) {
    return `This action updates a #${id} formacademica`;
  }

  remove(id: number) {
    return `This action removes a #${id} formacademica`;
  }
}
