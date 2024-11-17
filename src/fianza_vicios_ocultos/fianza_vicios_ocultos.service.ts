import { Injectable } from '@nestjs/common';
import { CreateFianzaViciosOcultoDto } from './dto/create-fianza_vicios_oculto.dto';
import { UpdateFianzaViciosOcultoDto } from './dto/update-fianza_vicios_oculto.dto';

@Injectable()
export class FianzaViciosOcultosService {
  create(createFianzaViciosOcultoDto: CreateFianzaViciosOcultoDto) {
    return 'This action adds a new fianzaViciosOculto';
  }

  findAll() {
    return `This action returns all fianzaViciosOcultos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fianzaViciosOculto`;
  }

  update(id: number, updateFianzaViciosOcultoDto: UpdateFianzaViciosOcultoDto) {
    return `This action updates a #${id} fianzaViciosOculto`;
  }

  remove(id: number) {
    return `This action removes a #${id} fianzaViciosOculto`;
  }
}
