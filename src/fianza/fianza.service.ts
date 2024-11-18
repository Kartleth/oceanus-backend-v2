import { Injectable } from '@nestjs/common';
import { CreateFianzaDto } from './dto/create-fianza.dto';
import { UpdateFianzaDto } from './dto/update-fianza.dto';

@Injectable()
export class FianzaService {
  create(createFianzaDto: CreateFianzaDto) {
    return 'This action adds a new fianza';
  }

  findAll() {
    return `This action returns all fianza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fianza`;
  }

  update(id: number, updateFianzaDto: UpdateFianzaDto) {
    return `This action updates a #${id} fianza`;
  }

  remove(id: number) {
    return `This action removes a #${id} fianza`;
  }
}
