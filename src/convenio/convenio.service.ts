import { Injectable } from '@nestjs/common';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenio } from './entities/convenio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConvenioService {
  constructor(
    @InjectRepository(Convenio)
    private readonly convenioRepository: Repository<Convenio>,
  ) {}
  create(createConvenioDto: CreateConvenioDto) {
    return 'This action adds a new convenio';
  }

  async findAllByContractId(contractId: number) {
    return await this.convenioRepository
      .createQueryBuilder('convenio')
      .leftJoinAndSelect('convenio.contratos', 'contrato')
      .where('contrato.idcontrato = :contractId', { contractId })
      .getMany();
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
