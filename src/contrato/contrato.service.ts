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

  async create(data: CreateContratoDto) {
    const empresaContratante = await this.empresaRepository.findOneBy({
      idempresa: data.idContratante,
    });
    const empresaContratado = await this.empresaRepository.findOneBy({
      idempresa: data.idContratado,
    });
    if (!empresaContratante || !empresaContratado) {
      throw new HttpException(
        'Empresas contratante y contratados no encontradas',
        HttpStatus.NOT_FOUND,
      );
    }
    let fianzaAnticipo: Fianza | undefined;
    if (data.fianzaAnticipo) {
      fianzaAnticipo = await this.fianzaRepository.save({
        anticipodoc: data.fianzaAnticipo.anticipodoc,
        aseguradora: data.fianzaAnticipo.aseguradora,
        documento: data.fianzaAnticipo.documento,
        fin: data.fianzaAnticipo.fin,
        inicio: data.fianzaAnticipo.inicio,
        monto: data.fianzaAnticipo.monto,
        poliza: data.fianzaAnticipo.poliza,
        tipodecambio: data.fianzaAnticipo.tipodecambio,
      });
    }
    let fianzaOculto: Fianza | undefined;
    if (data.fianzaOculto) {
      fianzaOculto = await this.fianzaRepository.save({
        anticipodoc: data.fianzaOculto.anticipodoc,
        aseguradora: data.fianzaOculto.aseguradora,
        documento: data.fianzaOculto.documento,
        fin: data.fianzaOculto.fin,
        inicio: data.fianzaOculto.inicio,
        monto: data.fianzaOculto.monto,
        poliza: data.fianzaOculto.poliza,
        tipodecambio: data.fianzaOculto.tipodecambio,
      });
    }
    let fianzaCumplimiento: Fianza | undefined;
    if (data.fianzaCumplimiento) {
      fianzaCumplimiento = await this.fianzaRepository.save({
        anticipodoc: data.fianzaCumplimiento.anticipodoc,
        aseguradora: data.fianzaCumplimiento.aseguradora,
        documento: data.fianzaCumplimiento.documento,
        fin: data.fianzaCumplimiento.fin,
        inicio: data.fianzaCumplimiento.inicio,
        monto: data.fianzaCumplimiento.monto,
        poliza: data.fianzaCumplimiento.poliza,
        tipodecambio: data.fianzaCumplimiento.tipodecambio,
      });
      console.log(fianzaAnticipo);
    }
    const contrato = await this.contratoRepository.save({
      fianzaAnticipo: fianzaAnticipo,
      fianzaCumplimiento: fianzaCumplimiento,
      fianzaOculto: fianzaOculto,
      nombrecontrato: data.nombreContrato,
      facturas: data.facturas,
      ordenes: data.ordenes,
      subcontrato: data.tipoSubcontrato,
      iniciocontrato: data.inicioContrato,
      fincontrato: data.finContrato,
      convenios: data.convenio,
      montocontrato: data.montoContrato,
      anticipocontrato: data.anticipoContrato,
      numerocontrato: data.numeroContrato,
      contratado: empresaContratado,
      contratante: empresaContratante,
      direccion: data.direccion,
    });
    for (const persona of data.personal) {
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
