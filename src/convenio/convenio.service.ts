import { Injectable } from '@nestjs/common';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';

@Injectable()
export class ConvenioService {
  create(createConvenioDto: CreateConvenioDto) {
    return 'This action adds a new convenio';
  }

  findAll() {
    return `This action returns all convenio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} convenio`;
  }

  update(id: number, updateConvenioDto: UpdateConvenioDto) {
    return `This action updates a #${id} convenio`;
  }

  remove(id: number) {
    return `This action removes a #${id} convenio`;
  }
}
