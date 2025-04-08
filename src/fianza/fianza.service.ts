import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFianzaDto } from './dto/create-fianza.dto';
import { UpdateFianzaDto } from './dto/update-fianza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fianza, TipoCambio, TipoFianza } from './entities/fianza.entity';
import { Contrato } from 'src/contrato/entities/contrato.entity';

@Injectable()
export class FianzaService {
  constructor(
    @InjectRepository(Fianza)
    private readonly fianzaRepository: Repository<Fianza>,

    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
  ) {}

  async createFianza(
    idContrato: number,
    dto: CreateFianzaDto,
  ): Promise<Fianza> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
    });
    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }

    const nuevaFianza = this.fianzaRepository.create({ ...dto, contrato });
    return await this.fianzaRepository.save(nuevaFianza);
  }

  async obtenerFianzasPorContrato(idContrato: number) {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
      relations: { fianzas: true },
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }

    const fianzasAnticipo = contrato.fianzas.filter(
      (f) => f.tipo === TipoFianza.ANTICIPO,
    );
    const fianzasOculto = contrato.fianzas.filter(
      (f) => f.tipo === TipoFianza.OCULTO,
    );
    const fianzasCumplimiento = contrato.fianzas.filter(
      (f) => f.tipo === TipoFianza.CUMPLIMIENTO,
    );

    return {
      idcontrato: contrato.idcontrato,
      nombrecontrato: contrato.nombrecontrato,
      fianzasAnticipo,
      fianzasOculto,
      fianzasCumplimiento,
    };
  }

  //Crear fianza anticipo
  async createFianzaAnticipo(
    idContrato: number,
    dto: CreateFianzaDto,
  ): Promise<Fianza> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }
    const nuevaFianza = this.fianzaRepository.create({
      ...dto,
      contrato,
      tipo: TipoFianza.ANTICIPO,
    });

    return await this.fianzaRepository.save(nuevaFianza);
  }

  // Obtener fianzas de anticipo por contrato
  async obtenerFianzasAnticipo(idContrato: number): Promise<Fianza[]> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
      relations: ['fianzas'],
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }

    const fianzasAnticipo = contrato.fianzas.filter(
      (f) => f.tipo === 'ANTICIPO',
    );
    return fianzasAnticipo;
  }

  // Obtener fianzas contrato y el Id de fianza de anticipo
  async obtenerFianzaAnticipoPorId(
    idContrato: number,
    idFianza: number,
  ): Promise<Fianza | null> {
    return this.fianzaRepository.findOne({
      where: {
        idfianza: idFianza,
        contrato: { idcontrato: idContrato },
        tipo: TipoFianza.ANTICIPO,
      },
      relations: ['contrato'],
    });
  }

  //Crear fianza cumplimiento
  async createFianzaCumplimiento(
    idContrato: number,
    dto: CreateFianzaDto,
  ): Promise<Fianza> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }
    const nuevaFianza = this.fianzaRepository.create({
      ...dto,
      contrato,
      tipo: TipoFianza.CUMPLIMIENTO,
    });

    return await this.fianzaRepository.save(nuevaFianza);
  }

  // Obtener fianzas de cumplimiento por contrato
  async obtenerFianzasCumplimiento(idContrato: number): Promise<Fianza[]> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
      relations: ['fianzas'],
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }

    const fianzasCumplimiento = contrato.fianzas.filter(
      (f) => f.tipo === 'CUMPLIMIENTO',
    );
    return fianzasCumplimiento;
  }

  // Obtener fianzas contrato y el Id de fianza de cumplimiento
  async obtenerFianzaCumplimientoPorId(
    idContrato: number,
    idFianza: number,
  ): Promise<Fianza | null> {
    return this.fianzaRepository.findOne({
      where: {
        idfianza: idFianza,
        contrato: { idcontrato: idContrato },
        tipo: TipoFianza.CUMPLIMIENTO,
      },
      relations: ['contrato'],
    });
  }

  //Crear fianza ocutlo
  async createFianzaOculto(
    idContrato: number,
    dto: CreateFianzaDto,
  ): Promise<Fianza> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }
    const nuevaFianza = this.fianzaRepository.create({
      ...dto,
      contrato,
      tipo: TipoFianza.OCULTO,
    });

    return await this.fianzaRepository.save(nuevaFianza);
  }

  // Obtener fianzas de oculto por contrato
  async obtenerFianzasOculto(idContrato: number): Promise<Fianza[]> {
    const contrato = await this.contratoRepository.findOne({
      where: { idcontrato: idContrato },
      relations: ['fianzas'],
    });

    if (!contrato) {
      throw new NotFoundException(
        `Contrato con ID ${idContrato} no encontrado`,
      );
    }

    const fianzasOculto = contrato.fianzas.filter((f) => f.tipo === 'OCULTO');
    return fianzasOculto;
  }

  // Obtener fianzas contrato y el Id de fianza de cumplimiento
  async obtenerFianzaOcultoPorId(
    idContrato: number,
    idFianza: number,
  ): Promise<Fianza | null> {
    return this.fianzaRepository.findOne({
      where: {
        idfianza: idFianza,
        contrato: { idcontrato: idContrato },
        tipo: TipoFianza.OCULTO,
      },
      relations: ['contrato'],
    });
  }

  async findAll(): Promise<Fianza[]> {
    return await this.fianzaRepository.find({ relations: ['contrato'] });
  }

  async findOne(id: number): Promise<Fianza> {
    const fianza = await this.fianzaRepository.findOne({
      where: { idfianza: id },
      relations: ['contrato'],
    });

    if (!fianza) {
      throw new NotFoundException(`Fianza con ID ${id} no encontrada`);
    }

    return fianza;
  }

  async actualizarFianza(
    idContrato: number,
    idFianza: number,
    updateFianzaDto: UpdateFianzaDto,
  ): Promise<Fianza> {
    const fianza = await this.fianzaRepository.findOne({
      where: { idfianza: idFianza, contrato: { idcontrato: idContrato } },
      relations: ['contrato'],
    });

    if (!fianza) {
      throw new NotFoundException(
        `No se encontró una fianza con ID ${idFianza} en el contrato ${idContrato}`,
      );
    }

    Object.assign(fianza, updateFianzaDto); // Actualiza solo los campos enviados en el DTO
    return await this.fianzaRepository.save(fianza);
  }

  async eliminarFianza(idContrato: number, idFianza: number): Promise<void> {
    const fianza = await this.fianzaRepository.findOne({
      where: {
        idfianza: idFianza,
        contrato: { idcontrato: idContrato },
      },
      relations: ['contrato'],
    });

    if (!fianza) {
      throw new NotFoundException(
        `No se encontró una fianza con ID ${idFianza} en el contrato ${idContrato}`,
      );
    }

    await this.fianzaRepository.remove(fianza);
  }
}
