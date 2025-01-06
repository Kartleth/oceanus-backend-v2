import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { DatosMedico } from 'src/datos_medicos/entities/datos_medico.entity';
import { Formacademica } from 'src/formacademica/entities/formacademica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personasRepository: Repository<Persona>,
  ) {}

  async create(data: CreatePersonaDto) {
    console.log('CreatePersonaDto', data);
    const datosAcademicos: Partial<Formacademica> = {
      carrera: data.datosAcademicos.carrera,
      cedula: data.datosAcademicos.cedula,
      certificaciones: data.datosAcademicos.certificaciones,
      explaboral: data.datosAcademicos.explaboral,
      gradoestudios: data.datosAcademicos.gradoestudios,
    };
    console.log('datosAcademicos ', datosAcademicos);
    const datosMedicos: Partial<DatosMedico> = {
      alergias: data.datosMedicos.alergias,
      alergiasmed: data.datosMedicos.alergiasmed,
      enfercronicas: data.datosMedicos.enfercronicas,
      lesiones: data.datosMedicos.lesiones,
      genero: data.datosMedicos.genero,
      nombremergencia: data.datosMedicos.nombremergencia,
      numemergencia: data.datosMedicos.numemergencia,
      numseguro: data.datosMedicos.numseguro,
      relaemergencia: data.datosMedicos.relaemergencia,
      tiposangre: data.datosMedicos.tiposangre,
    };
    const persona: Partial<Persona> = {
      datosAcademicos: datosAcademicos as Formacademica,
      datosMedicos: datosMedicos as DatosMedico,
      nombre: data.nombre,
      correo: data.correo,
      curp: data.curp,
      direccion: data.direccion,
      numerofijo: data.numerofijo,
      estado: data.estado,
      estadocivil: data.estadocivil,
      fechaingreso: data.fechaingreso,
      fechanacimiento: data.fechanacimiento,
      fincontrato: data.fincontrato,
      ine: data.ine,
      iniciocontrato: data.iniciocontrato,
      numerocelular: data.numerocelular,
      numerolicencia: data.numerolicencia,
      numeropasaporte: data.numeropasaporte,
      rfc: data.rfc,
      tipocontrato: data.tipocontrato,
    };
    const result = await this.personasRepository.save(persona);
    return result;
  }

  async findAll() {
    const personas = await this.personasRepository.find({
      relations: { datosAcademicos: true, datosMedicos: true },
    });
    return personas;
  }

  async findOne(id: number) {
    const persona = await this.personasRepository.findOne({
      where: { id: id },
      relations: { datosAcademicos: true, datosMedicos: true },
    });
    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    //Codigo para hacer update que luego se va a agregar porque ahorita se esta arreglando la BD
    return await this.personasRepository.update({ id: id }, updatePersonaDto);
  }

  async remove(id: number) {
    const result = await this.personasRepository.delete(id);
    return result;
  }
}
