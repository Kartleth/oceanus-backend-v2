import { Injectable } from '@nestjs/common';
import { CreateDatosMedicoDto } from './dto/create-datos_medico.dto';
import { UpdateDatosMedicoDto } from './dto/update-datos_medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosMedico } from './entities/datos_medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatosMedicosService {
  constructor(
    @InjectRepository(DatosMedico)
    private readonly datosmedicosRepository: Repository<DatosMedico>,
  ) {}

  async create(data: CreateDatosMedicoDto): Promise<DatosMedico> {
    const nuevaFormacionAcademica = this.datosmedicosRepository.create(data);
    return await this.datosmedicosRepository.save(nuevaFormacionAcademica);
  }

  async findAll(): Promise<DatosMedico[]> {
    return await this.datosmedicosRepository.find();
  }

  async findOne(id: number): Promise<DatosMedico> {
    return await this.datosmedicosRepository.findOne({
      where: { idmedicos: id },
    });
  }

  update(id: number, updateDatosMedicoDto: UpdateDatosMedicoDto) {
    return `This action updates a #${id} datosMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosMedico`;
  }
}
