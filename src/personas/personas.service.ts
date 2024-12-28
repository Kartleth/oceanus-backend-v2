import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import {
  DatosMedico,
  Genero,
} from 'src/datos_medicos/entities/datos_medico.entity';
import { Formacademica } from 'src/formacademica/entities/formacademica.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona) private personasRepository: Repository<Persona>,
  ) {}

  async create(data: CreatePersonaDto) {
    const datosAcademicos: Partial<Formacademica> = {
      carrera: data.datosAcademicos.carrera,
      cedula: data.datosAcademicos.cadulaProfesional,
      certificaciones: data.datosAcademicos.certificaciones,
      explaboral: data.datosAcademicos.experienciaLaboral,
      gradoestudios: data.datosAcademicos.gradosEstudios,
    };
    const datosMedicos: Partial<DatosMedico> = {
      alergias: data.datosMedicos.alegias,
      alergiasmed: data.datosMedicos.alergiasMedicamentos,
      enfercronicas: data.datosMedicos.enfermedadCronica,
      lesiones: data.datosMedicos.lesiones,
      genero: data.datosMedicos.genero as Genero,
      nombremergencia: data.datosMedicos.nombreemergencia,
      numemergencia: data.datosMedicos.numeroEmergencia,
      numseguro: data.datosMedicos.numeroSeguro,
      relaemergencia: data.datosMedicos.relacionPersona,
      tiposangre: data.datosMedicos.tipoSangre,
    };
    const persona: Partial<Persona> = {
      datosAcademicos: datosAcademicos as Formacademica,
      datosMedicos: datosMedicos as DatosMedico,
      nombre: data.name,
      correo: data.correoElectronico,
      curp: data.curp,
      direccion: data.direccion,
      numerofijo: data.numeroCasa,
      estado: data.estadoEmpleado,
      estadocivil: data.estadoCivil,
      fechaingreso: new Date(data.fechaIngreso),
      fechanacimiento: new Date(data.fechaNacimiento),
      fincontrato: new Date(data.fechaFinContrato),
      ine: data.clave,
      iniciocontrato: new Date(data.fechaInicioContrato),
      numerocelular: data.numeroCelular,
      numerolicencia: data.numeroLicencia,
      numeropasaporte: data.numeroPasaporte,
      rfc: data.rfc,
      tipocontrato: data.tipoContrato,
    };
    const result = await this.personasRepository.save(persona);
    return result;
  }

  async findAll(options?: FindManyOptions<Persona>): Promise<Persona[]> {
    return await this.personaRepository.find(options);
  }

  async findOne(id: number): Promise<Persona> {
    return await this.personaRepository.findOne({
      where: { id },
      relations: ['formacademica', 'datosmedico'],
    });
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    // Cambiar la forma de llamar a findOne()
    const persona = await this.personaRepository.findOne({
      where: { id }, // Filtra por ID
      relations: ['formacademica', 'datosmedico'], // Relacionar formacademica y datosmedico
    });

    if (!persona) {
      throw new Error('Persona no encontrada');
    }

    // Actualizar datos de Persona
    if (updatePersonaDto.formacademica) {
      // Aquí actualizas la formación académica
      if (persona.formacademica) {
        persona.formacademica = {
          ...persona.formacademica,
          ...updatePersonaDto.formacademica,
        };
      }
    }

    // Actualizar datos médicos
    if (updatePersonaDto.datosmedico) {
      if (persona.datosmedico) {
        persona.datosmedico = {
          ...persona.datosmedico,
          ...updatePersonaDto.datosmedico,
        };
      }
    }

    // Actualizar persona
    Object.assign(persona, updatePersonaDto);
    return this.personaRepository.save(persona);
  }

  async remove(id: number): Promise<void> {
    const persona = await this.personaRepository.findOne({
      where: { id },
    });

    if (!persona) {
      throw new Error('Persona no encontrada');
    }

    await this.personaRepository.remove(persona);
  }
}
