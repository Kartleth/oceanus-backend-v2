import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenio } from './entities/convenio.entity';
import { Repository } from 'typeorm';
import { Contrato } from 'src/contrato/entities/contrato.entity';
import { ConvenioDto } from './dto/convenio.dto';

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
    const resultado = await this.convenioRepository
      .createQueryBuilder('convenio')
      .leftJoinAndSelect('convenio.contrato', 'contrato')
      .where('contrato.idcontrato = :idcontrato', { idcontrato })
      .getMany();
    const convenios: Array<ConvenioDto> = resultado.map((convenio) => ({
      documento: convenio.documento,
      fechafinal: convenio.fechafinal,
      fechainicio: convenio.fechainicio,
      contrato: convenio.contrato,
      idconvenio: convenio.idconvenio,
      montoadicional: convenio.montoadicional,
    }));
    return convenios;
  }

  async findAll() {
    const convenios = await this.convenioRepository.find({
      relations: { contrato: true },
    });
    console.log('Convenios cargados:', convenios);
    return convenios;
  }

  async findOne(id: number) {
    const convenio = await this.convenioRepository.findOne({
      where: { idconvenio: id },
    });
    if (!convenio) {
      throw new NotFoundException(`Convenio con ID ${id} no encontrado`);
    }
    return convenio;
  }

  update(id: number, updateConvenioDto: UpdateConvenioDto) {
    return `This action updates a #${id} convenio`;
  }

  async remove(id: number) {
    const result = await this.convenioRepository.delete(id);
    return result;
  }
}
