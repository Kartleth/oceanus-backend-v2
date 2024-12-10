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
    private readonly datosmedicosRepository: Repository<DatosMedico>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
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

  async findAll() {
    return await this.datosmedicosRepository.find({
      relations: ['empleado'], // Esto incluirá los datos relacionados de Persona
    });
  }

  async findOne(id: number) {
    return await this.datosmedicosRepository.findOne({
      where: { idmedicos: id },
      relations: ['empleado'], // Asegúrate de incluir la relación
    });
  }

  update(id: number, updateDatosMedicoDto: UpdateDatosMedicoDto) {
    return `This action updates a #${id} datosMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} datosMedico`;
  }
}
