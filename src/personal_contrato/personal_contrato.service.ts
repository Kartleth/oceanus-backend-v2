import { Injectable } from '@nestjs/common';
import { CreatePersonalContratoDto } from './dto/create-personal_contrato.dto';
import { UpdatePersonalContratoDto } from './dto/update-personal_contrato.dto';

@Injectable()
export class PersonalContratoService {
  create(createPersonalContratoDto: CreatePersonalContratoDto) {
    return 'This action adds a new personalContrato';
  }

  findAll() {
    return `This action returns all personalContrato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalContrato`;
  }

  update(id: number, updatePersonalContratoDto: UpdatePersonalContratoDto) {
    return `This action updates a #${id} personalContrato`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalContrato`;
  }
}
