import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubcontratadoDto } from './dto/create-subcontratado.dto';
import { UpdateSubcontratadoDto } from './dto/update-subcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcontratado } from './entities/subcontratado.entity';
import { Docsubcontratado } from 'src/docsubcontratado/entities/docsubcontratado.entity';
import { CreateDocsubcontratadoDto } from 'src/docsubcontratado/dto/create-docsubcontratado.dto';
import { Contrato } from 'src/contrato/entities/contrato.entity';
import { SubcontratoDto } from './dto/subcontrato.dto';

@Injectable()
export class SubcontratadosService {
  constructor(
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
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

  // async create(
  //   data: CreateSubcontratadoDto,
  // ): Promise<Subcontratado> {
  //   const contratodb = await this.contratoRepository.findOneBy({
  //     idcontrato: data.idContrato,
  //   });
  //   if(!contratodb){
  //           throw new HttpException('Contrato no encontrado.', HttpStatus.NOT_FOUND);
  //   }
  //   const newSubcontratado = this.subcontratadoRepository.create(
  //     data,);
  //   return this.subcontratadoRepository.save(newSubcontratado);
  // }

  async create(data: CreateSubcontratadoDto) {
    const contratodb = await this.contratoRepository.findOneBy({
      idcontrato: data.idContrato,
    });

    if (!contratodb) {
      throw new HttpException('Contrato no encontrado.', HttpStatus.NOT_FOUND);
    }

    const subcontratado = await this.subcontratadoRepository.save({
      contrato: contratodb, // Se asocia el contrato
      nombre: data.nombre,
      rfc: data.rfc,
      nss: data.nss,
      ine: data.ine,
      curp: data.curp,
      estado: data.estado,
      doc: data.doc,
    });

    return { message: 'Subcontratado creado con éxito.' };
  }
  async findAllByContractId(idcontrato: number) {
    const resultado = await this.subcontratadoRepository
      .createQueryBuilder('subcontratado')
      .leftJoinAndSelect('subcontratado.contrato', 'contrato')
      .where('contrato.idcontrato = :idcontrato', { idcontrato })
      .getMany();

    const subcontrato: Array<SubcontratoDto> = resultado.map((subcontrato) => ({
      idSucontratado: subcontrato.idsubcontratado,
      nombre: subcontrato.nombre,
      rfc: subcontrato.rfc,
      nss: subcontrato.nss,
      ine: subcontrato.ine,
      curp: subcontrato.curp,
      estado: subcontrato.estado,
      doc: subcontrato.doc,
      contrato: subcontrato.contrato,
    }));

    return subcontrato;
  }
  async findAll() {
    const subcontratos = await this.subcontratadoRepository.find({
      relations: { contrato: true },
    });
    console.log('Subcontratos cargados:', subcontratos);
    return subcontratos;
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
