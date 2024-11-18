import { Injectable } from '@nestjs/common';
import { CreateEmpresaPersonalDto } from './dto/create-empresa_personal.dto';
import { UpdateEmpresaPersonalDto } from './dto/update-empresa_personal.dto';

@Injectable()
export class EmpresaPersonalService {
  create(createEmpresaPersonalDto: CreateEmpresaPersonalDto) {
    return 'This action adds a new empresaPersonal';
  }

  findAll() {
    return `This action returns all empresaPersonal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresaPersonal`;
  }

  update(id: number, updateEmpresaPersonalDto: UpdateEmpresaPersonalDto) {
    return `This action updates a #${id} empresaPersonal`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresaPersonal`;
  }
}
