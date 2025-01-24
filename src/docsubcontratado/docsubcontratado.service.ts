import { Injectable } from '@nestjs/common';
import { CreateDocsubcontratadoDto } from './dto/create-docsubcontratado.dto';
import { UpdateDocsubcontratadoDto } from './dto/update-docsubcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docsubcontratado } from './entities/docsubcontratado.entity';
import { Repository } from 'typeorm';
import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';

@Injectable()
export class DocsubcontratadoService {
  constructor(
    @InjectRepository(Docsubcontratado)
    private readonly docsubcontratadoRepository: Repository<Docsubcontratado>,
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
  ) {}

  async findOne(subcontratadoID: number): Promise<Docsubcontratado> {
    return await this.docsubcontratadoRepository.findOne({
      where: { subcontratado: { idsubcontratado: subcontratadoID } },
      relations: ['subcontratado'],
    });
  }

  create(createDocsubcontratadoDto: CreateDocsubcontratadoDto) {
    return 'This action adds a new docsubcontratado';
  }

  findAll() {
    return `This action returns all docsubcontratado`;
  }

  update(id: number, updateDocsubcontratadoDto: UpdateDocsubcontratadoDto) {
    return `This action updates a #${id} docsubcontratado`;
  }

  remove(id: number) {
    return `This action removes a #${id} docsubcontratado`;
  }

  //--------------------------------------------------------------------------------
  //Mettodo paraguardar documentación
}
