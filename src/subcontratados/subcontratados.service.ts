import { Injectable } from '@nestjs/common';
import { CreateSubcontratadoDto } from './dto/create-subcontratado.dto';
import { UpdateSubcontratadoDto } from './dto/update-subcontratado.dto';

@Injectable()
export class SubcontratadosService {
  create(createSubcontratadoDto: CreateSubcontratadoDto) {
    return 'This action adds a new subcontratado';
  }

  findAll() {
    return `This action returns all subcontratados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subcontratado`;
  }

  update(id: number, updateSubcontratadoDto: UpdateSubcontratadoDto) {
    return `This action updates a #${id} subcontratado`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcontratado`;
  }
}
