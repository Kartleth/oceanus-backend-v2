import { Injectable } from '@nestjs/common';
import { CreateDatosMedicoDto } from './dto/create-datos_medico.dto';
import { UpdateDatosMedicoDto } from './dto/update-datos_medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosMedico } from './entities/datos_medico.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';

@Injectable()
export class DatosMedicosService {
  constructor(
    @InjectRepository(DatosMedico)
    private datosmedicosRepository: Repository<DatosMedico>,
    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
  ) {}

  async create(
    createDatosMedicoDto: CreateDatosMedicoDto,
  ): Promise<DatosMedico> {
    const { empleado, ...datosmedicoData } = createDatosMedicoDto;
    const persona = await this.personaRepository.findOne({
      where: { id: empleado.id },
    });

    if (!persona) {
      throw new Error('La persona no existe');
    }

    const datosmedico = this.datosmedicosRepository.create({
      ...datosmedicoData,
      empleado: persona,
    });

    return await this.datosmedicosRepository.save(datosmedico);
  }

  findAll() {
    return `This action returns all datosMedicos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datosMedico`;
  }

  update(id: number, updateDatosMedicoDto: UpdateDatosMedicoDto) {
    return `This action updates a #${id} datosMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosMedico`;
  }
}
