import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenio } from './entities/convenio.entity';
import { Repository } from 'typeorm';
import { Contrato } from 'src/contrato/entities/contrato.entity';

@Injectable()
export class ConvenioService {
  constructor(
    @InjectRepository(Convenio)
    private readonly convenioRepository: Repository<Convenio>,
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
  ) {}

  async create(data: CreateConvenioDto) {
    const contratodb = await this.contratoRepository.findOneBy({
      idcontrato: data.idContrato,
    });
    if (!contratodb) {
      throw new HttpException('Contrato no encontrado.', HttpStatus.NOT_FOUND);
    }
    const convenio = await this.convenioRepository.save({
      contrato: contratodb,
      documento: data.documento,
      fechafinal: data.fechafinal,
      fechainicio: data.fechainicio,
      montoadicional: data.montoadicional,
    });
    return { message: 'Convenio creado con exito.' };
  }

  async findAllByContractId(idcontrato: number) {
    return await this.convenioRepository
      .createQueryBuilder('convenio')
      .leftJoinAndSelect('convenio.contratos', 'contrato')
      .where('contrato.idcontrato = :contractId', { idcontrato })
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
