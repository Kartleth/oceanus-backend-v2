import { Injectable } from '@nestjs/common';
import { CreateDocumentacionDto } from './dto/create-documentacion.dto';
import { UpdateDocumentacionDto } from './dto/update-documentacion.dto';

@Injectable()
export class DocumentacionService {
  create(createDocumentacionDto: CreateDocumentacionDto) {
    return 'This action adds a new documentacion';
  }

  findAll() {
    return `This action returns all documentacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentacion`;
  }

  update(id: number, updateDocumentacionDto: UpdateDocumentacionDto) {
    return `This action updates a #${id} documentacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentacion`;
  }
}
