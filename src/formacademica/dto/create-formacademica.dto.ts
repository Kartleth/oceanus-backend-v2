import { Persona } from 'src/personas/entities/persona.entity';

export class CreateFormacademicaDto {
  empleado: Persona;
  cedula: string;
  carrera: string;
  explaboral: string;
  certificaciones: string;
  gradoestudios: string;
}
