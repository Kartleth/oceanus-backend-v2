import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const nuevaEmpresa = this.empresaRepository.create(createEmpresaDto);
    return this.empresaRepository.save(nuevaEmpresa);
  }

  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find();
  }

  async findOne(id: number): Promise<Empresa> {
    return this.empresaRepository.findOne({ where: { idempresa: id } });
  }

  async update(
    id: number,
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    const empresa = await this.findOne(id);
    Object.assign(empresa, updateEmpresaDto);
    return this.empresaRepository.save(empresa);
  }

  async remove(id: number) {
    const result = await this.empresaRepository.delete(id);
    return result;
  }
}
