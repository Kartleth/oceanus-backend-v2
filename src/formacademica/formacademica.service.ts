import { Injectable } from '@nestjs/common';
import { CreateFormacademicaDto } from './dto/create-formacademica.dto';
import { UpdateFormacademicaDto } from './dto/update-formacademica.dto';

@Injectable()
export class FormacademicaService {
  create(createFormacademicaDto: CreateFormacademicaDto) {
    return 'This action adds a new formacademica';
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
