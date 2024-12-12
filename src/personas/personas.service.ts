import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona) private personasRepository: Repository<Persona>,
  ) {}
  create(data: CreatePersonaDto) {
    const persona: Partial<Persona> = {
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
    this.personasRepository.save(persona);
    return { message: 'This action adds a new persona' };
  }

  findAll() {
    return `This action returns all personas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} persona`;
  }

  update(id: number, updatePersonaDto: UpdatePersonaDto) {
    return `This action updates a #${id} persona`;
  }

  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
