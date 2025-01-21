import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { Repository } from 'typeorm';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Fianza)
    private readonly fianzaRepository: Repository<Fianza>,
    @InjectRepository(Convenio)
    private readonly convenioRepository: Repository<Convenio>,
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(OrdenServicio)
    private readonly ordenServicioRepository: Repository<OrdenServicio>,
    @InjectRepository(PersonalContrato)
    private readonly personalContratoRepository: Repository<PersonalContrato>,
  ) {}
  async create(createContratoDto: CreateContratoDto) {
    const empresaContratante = await this.empresaRepository.findOneBy({
      idempresa: createContratoDto.idContratante,
    });
    const empresaContratado = await this.empresaRepository.findOneBy({
      idempresa: createContratoDto.idContratado,
    });
    if (!empresaContratante || !empresaContratado) {
      throw new HttpException(
        'Empresas contratante y contratados no encontradas',
        HttpStatus.NOT_FOUND,
      );
    }
    const fianzas = [];
    if (createContratoDto.fianza) {
    }
    const contrato = await this.contratoRepository.save({
      nombrecontrato: createContratoDto.nombreContrato,
      facturas: createContratoDto.facturas,
      ordenes: createContratoDto.ordenes,
      subcontrato: createContratoDto.tipoSubcontrato,
      iniciocontrato: createContratoDto.inicioContrato,
      fincontrato: createContratoDto.finContrato,
      convenios: createContratoDto.convenio,
      fianzas: createContratoDto.fianza,
      montocontrato: createContratoDto.montoContrato,
      anticipocontrato: createContratoDto.anticipoContrato,
      numerocontrato: createContratoDto.numeroContrato,
      contratado: empresaContratado,
      contratante: empresaContratante,
      direccion: createContratoDto.direccion,
    });
    for (const persona of createContratoDto.personal) {
      const personadb = await this.personaRepository.findOneBy({
        id: persona.idPersona,
      });
      if (!personadb) {
        continue;
      }
      await this.personalContratoRepository.save({
        contrato: contrato,
        persona: personadb,
        tipopersonal: persona.tipoPersonal,
      });
    }

    return { message: 'Contrato creado con exito.' };
  }

  findAll() {
    return `This action returns all contrato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contrato`;
  }

  update(id: number, updateContratoDto: UpdateContratoDto) {
    return `This action updates a #${id} contrato`;
  }

  remove(id: number) {
    return `This action removes a #${id} contrato`;
  }
}
