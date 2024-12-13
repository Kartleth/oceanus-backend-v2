import { Injectable } from '@nestjs/common';
import { CreateDatosMedicoDto } from './dto/create-datos_medico.dto';
import { UpdateDatosMedicoDto } from './dto/update-datos_medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DatosMedico, Genero } from './entities/datos_medico.entity';
import { Repository } from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';

@Injectable()
export class DatosMedicosService {
  constructor(
    @InjectRepository(DatosMedico)
    private medicoRepository: Repository<DatosMedico>,
  ) {}
  async create(data: CreateDatosMedicoDto, persona: Persona) {
    const datosMedicos: Partial<DatosMedico> = {
      alergias: data.alegias,
      alergiasmed: data.alergiasMedicamentos,
      enfercronicas: data.enfermedadCronica,
      lesiones: data.lesiones,
      genero: data.genero as Genero,
      nombremergencia: data.nombreemergencia,
      numemergencia: data.numeroEmergencia,
      numseguro: data.numeroSeguro,
      relaemergencia: data.relacionPersona,
      tiposangre: data.tipoSangre,
      empleado: persona,
    };
    return await this.medicoRepository.save(datosMedicos);
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
