import { Injectable } from '@nestjs/common';
import { CreateCambioDto } from './dto/create-cambio.dto';
import { UpdateCambioDto } from './dto/update-cambio.dto';

@Injectable()
export class CambiosService {
  create(createCambioDto: CreateCambioDto) {
    return 'This action adds a new cambio';
  }

  findAll() {
    return `This action returns all cambios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambio`;
  }

  update(id: number, updateCambioDto: UpdateCambioDto) {
    return `This action updates a #${id} cambio`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambio`;
  }
}
