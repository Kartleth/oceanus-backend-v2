import { Injectable } from '@nestjs/common';
import { CreateFianzaAnticipoDto } from './dto/create-fianza_anticipo.dto';
import { UpdateFianzaAnticipoDto } from './dto/update-fianza_anticipo.dto';

@Injectable()
export class FianzaAnticipoService {
  create(createFianzaAnticipoDto: CreateFianzaAnticipoDto) {
    return 'This action adds a new fianzaAnticipo';
  }

  findAll() {
    return `This action returns all fianzaAnticipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fianzaAnticipo`;
  }

  update(id: number, updateFianzaAnticipoDto: UpdateFianzaAnticipoDto) {
    return `This action updates a #${id} fianzaAnticipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} fianzaAnticipo`;
  }
}
