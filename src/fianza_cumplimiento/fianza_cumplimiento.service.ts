import { Injectable } from '@nestjs/common';
import { CreateFianzaCumplimientoDto } from './dto/create-fianza_cumplimiento.dto';
import { UpdateFianzaCumplimientoDto } from './dto/update-fianza_cumplimiento.dto';

@Injectable()
export class FianzaCumplimientoService {
  create(createFianzaCumplimientoDto: CreateFianzaCumplimientoDto) {
    return 'This action adds a new fianzaCumplimiento';
  }

  findAll() {
    return `This action returns all fianzaCumplimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fianzaCumplimiento`;
  }

  update(id: number, updateFianzaCumplimientoDto: UpdateFianzaCumplimientoDto) {
    return `This action updates a #${id} fianzaCumplimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} fianzaCumplimiento`;
  }
}
