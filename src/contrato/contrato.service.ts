import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';
import { FianzaService } from 'src/fianza/fianza.service';

@Injectable()
export class ContratoService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
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
    private readonly fianzaService: FianzaService,
  ) {}

  async createContrato(data: CreateContratoDto) {
    const empresaContratado = await this.clienteRepository.findOneBy({
      idCliente: data.idContratado,
    });
    if (!empresaContratado) {
      throw new HttpException(
        'Empresa contratada no encontrada',
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
      iniciocontrato: data.iniciocontrato,
      fincontrato: data.fincontrato,
      convenios: data.convenio,
      montocontrato: data.montoContrato,
      anticipocontrato: data.anticipoContrato,
      numerocontrato: data.numeroContrato,
      contratado: empresaContratado,
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

  async create(data: CreateContratoDto) {
    const empresaContratado = await this.clienteRepository.findOneBy({
      idCliente: data.idContratado,
    });
    if (!empresaContratado) {
      throw new HttpException(
        'Empresa contratada no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    const contrato = await this.contratoRepository.save({
      nombrecontrato: data.nombreContrato,
      facturas: data.facturas,
      ordenes: data.ordenes,
      subcontrato: data.tipoSubcontrato,
      iniciocontrato: data.iniciocontrato,
      fincontrato: data.fincontrato,
      convenios: data.convenio,
      montocontrato: data.montoContrato,
      anticipocontrato: data.anticipoContrato,
      numerocontrato: data.numeroContrato,
      contratado: empresaContratado,
      direccion: data.direccion,
    });
    if (data.fianzaAnticipo) {
      await this.fianzaService.createFianzaAnticipo(
        contrato.idcontrato,
        data.fianzaAnticipo,
      );
    }

    if (data.fianzaCumplimiento) {
      await this.fianzaService.createFianzaCumplimiento(
        contrato.idcontrato,
        data.fianzaCumplimiento,
      );
    }

    if (data.fianzaOculto) {
      await this.fianzaService.createFianzaOculto(
        contrato.idcontrato,
        data.fianzaOculto,
      );
    }
    for (const persona of data.personal) {
      const personadb = await this.personaRepository.findOneBy({
        id: persona.idPersona,
      });
      if (!personadb) continue;
      await this.personalContratoRepository.save({
        contrato,
        persona: personadb,
        tipopersonal: persona.tipoPersonal,
      });
    }
    console.log('Contrato guardado:', contrato);
    return { message: 'Contrato creado con éxito.' };
  }

  async editar(idContrato: number, data: UpdateContratoDto) {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
      relations: ['contratado'],
    });

    if (!contrato) {
      throw new HttpException('Contrato no encontrado', HttpStatus.NOT_FOUND);
    }

    if (data.idContratado) {
      contrato.contratado = await this.getEmpresaContratado(data.idContratado);
    }

    this.updateContratoFields(contrato, data);

    await this.contratoRepository.save(contrato);

    if (data.personal?.length) {
      await this.updatePersonalContrato(idContrato, data.personal, contrato);
    }

    return { message: 'Contrato actualizado con éxito.' };
  }

  private async getEmpresaContratado(idContratado: number): Promise<Cliente> {
    const empresaContratado = await this.clienteRepository.findOneBy({
      idCliente: idContratado,
    });

    if (!empresaContratado) {
      throw new HttpException(
        'Empresa contratada no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return empresaContratado;
  }

  private async updateContratoFields(
    contrato: Contrato,
    data: UpdateContratoDto,
  ): Promise<void> {
    if (data.nombreContrato !== undefined)
      contrato.nombrecontrato = data.nombreContrato;

    if (data.idContratado !== undefined) {
      const cliente = await this.clienteRepository.findOneBy({
        idCliente: data.idContratado,
      });
      if (cliente) {
        contrato.contratado = cliente;
      }
    }

    if (data.tipoSubcontrato !== undefined)
      contrato.subcontrato = data.tipoSubcontrato;

    if (data.iniciocontrato !== undefined)
      contrato.iniciocontrato = data.iniciocontrato;

    if (data.fincontrato !== undefined) contrato.fincontrato = data.fincontrato;

    if (data.montoContrato !== undefined)
      contrato.montocontrato = data.montoContrato;

    if (data.anticipoContrato !== undefined)
      contrato.anticipocontrato = data.anticipoContrato;

    if (data.numeroContrato !== undefined)
      contrato.numerocontrato = data.numeroContrato;

    if (data.direccion !== undefined) contrato.direccion = data.direccion;
  }

  private async updatePersonalContrato(
    idContrato: number,
    personal: UpdateContratoDto['personal'],
    contrato: Contrato,
  ): Promise<void> {
    await this.personalContratoRepository.delete({
      contrato: { idcontrato: idContrato },
    });

    for (const persona of personal) {
      const personadb = await this.personaRepository.findOneBy({
        id: persona.idPersona,
      });
      if (!personadb) continue;

      await this.personalContratoRepository.save({
        contrato,
        persona: personadb,
        tipopersonal: persona.tipoPersonal,
      });
    }
  }

  async findAll() {
    const contratos = await this.contratoRepository.find({
      relations: {
        facturas: true,
        contratado: true,
        ordenes: true,
        personalcontrato: { contrato: true, persona: true },
        convenios: true,
        fianzas: true,
      },
    });
    console.dir('Contratos cargados:', contratos);
    return contratos;
  }

  async findOne(id: number) {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: id },
      relations: {
        facturas: true,
        contratado: true,
        ordenes: true,
        personalcontrato: true,
        convenios: true,
        fianzas: true,
      },
    });
    return contrato;
  }

  async remove(id: number) {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: id },
      relations: ['fianzas', 'convenios', 'personalcontrato'],
    });

    if (!contrato) {
      throw new HttpException('Contrato no encontrado', HttpStatus.NOT_FOUND);
    }
    if (contrato.convenios?.length) {
      await this.convenioRepository.remove(contrato.convenios);
    }
    if (contrato.fianzas?.length) {
      await this.fianzaRepository.remove(contrato.fianzas);
    }
    await this.contratoRepository.remove(contrato);

    return { message: 'Contrato y elementos relacionados eliminados.' };
  }
}
