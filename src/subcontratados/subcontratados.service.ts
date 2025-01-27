import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcontratadoDto } from './dto/create-subcontratado.dto';
import { UpdateSubcontratadoDto } from './dto/update-subcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcontratado } from './entities/subcontratado.entity';
import { Docsubcontratado } from 'src/docsubcontratado/entities/docsubcontratado.entity';
import { CreateDocsubcontratadoDto } from 'src/docsubcontratado/dto/create-docsubcontratado.dto';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Injectable()
export class SubcontratadosService {
  constructor(
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async addDocumentoSubcontratado(
    subcontratadoId: number,
    createDocsubcontratadoDto: CreateDocsubcontratadoDto,
  ): Promise<Docsubcontratado> {
    // Buscar al subcontratado con la relación 'docsubcontratado'
    const subcontratado = await this.subcontratadoRepository.findOne({
      where: { idsubcontratado: subcontratadoId },
      relations: ['docsubcontratado'],
    });

    if (!subcontratado) {
      throw new Error('Subcontratado no encontrado');
    }

    // Crear el nuevo documento asociado al subcontratado
    const docsubcontratado = this.subcontratadoRepository.manager.create(
      Docsubcontratado,
      {
        ...createDocsubcontratadoDto,
        subcontratado, // Asociar el subcontratado
      },
    );

    // Guardar el documento
    return await this.subcontratadoRepository.manager.save(
      Docsubcontratado,
      docsubcontratado,
    );
  }

  async create(
    createSubcontratadoDto: CreateSubcontratadoDto,
  ): Promise<Subcontratado> {
    const { idEmpresa, ...subcontratadoData } = createSubcontratadoDto;

    const newSubcontratado =
      this.subcontratadoRepository.create(subcontratadoData);

    if (idEmpresa) {
      const empresa = await this.empresaRepository.findOne({
        where: { idempresa: idEmpresa },
      });

      if (!empresa) {
        throw new NotFoundException(
          `Empresa con ID ${idEmpresa} no encontrada`,
        );
      }
      newSubcontratado.empresa = empresa;
    }

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

  async remove(id: number) {
    const result = await this.subcontratadoRepository.delete(id);
    return result;
  }
}
