import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcontratadoDto } from './dto/create-subcontratado.dto';
import { UpdateSubcontratadoDto } from './dto/update-subcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcontratado } from './entities/subcontratado.entity';

@Injectable()
export class SubcontratadosService {
  constructor(
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
  ) {}

  async create(
    createSubcontratadoDto: CreateSubcontratadoDto,
  ): Promise<Subcontratado> {
    const newSubcontratado = this.subcontratadoRepository.create(
      createSubcontratadoDto,
    );
    return this.subcontratadoRepository.save(newSubcontratado);
  }

  async findAll(): Promise<Subcontratado[]> {
    return this.subcontratadoRepository.find();
  }

  async findOne(id: number): Promise<Subcontratado> {
    const subcontratado = await this.subcontratadoRepository.findOne({
      where: { idsubcontratado: id },
    });
    if (!subcontratado) {
      throw new NotFoundException(`Subcontratado con ID ${id} no encontrado`);
    }
    return subcontratado;
  }

  async update(
    id: number,
    updateSubcontratadoDto: UpdateSubcontratadoDto,
  ): Promise<Subcontratado> {
    const subcontratado = await this.findOne(id);
    Object.assign(subcontratado, updateSubcontratadoDto);
    return this.subcontratadoRepository.save(subcontratado);
  }

  async remove(id: number): Promise<void> {
    const subcontratado = await this.findOne(id);
    await this.subcontratadoRepository.remove(subcontratado);
  }
}
