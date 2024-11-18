import { Injectable } from '@nestjs/common';
import { CreateDatosMedicoDto } from './dto/create-datos_medico.dto';
import { UpdateDatosMedicoDto } from './dto/update-datos_medico.dto';

@Injectable()
export class DatosMedicosService {
  create(createDatosMedicoDto: CreateDatosMedicoDto) {
    return 'This action adds a new datosMedico';
  }

  findAll() {
    return `This action returns all datosMedicos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosMedico`;
  }

  update(id: number, updateDatosMedicoDto: UpdateDatosMedicoDto) {
    return `This action updates a #${id} datosMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosMedico`;
  }
}
