import { Injectable } from '@nestjs/common';
import { CreateDocsubcontratadoDto } from './dto/create-docsubcontratado.dto';
import { UpdateDocsubcontratadoDto } from './dto/update-docsubcontratado.dto';

@Injectable()
export class DocsubcontratadoService {
  create(createDocsubcontratadoDto: CreateDocsubcontratadoDto) {
    return 'This action adds a new docsubcontratado';
  }

  findAll() {
    return `This action returns all docsubcontratado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} docsubcontratado`;
  }

  update(id: number, updateDocsubcontratadoDto: UpdateDocsubcontratadoDto) {
    return `This action updates a #${id} docsubcontratado`;
  }

  remove(id: number) {
    return `This action removes a #${id} docsubcontratado`;
  }
}
