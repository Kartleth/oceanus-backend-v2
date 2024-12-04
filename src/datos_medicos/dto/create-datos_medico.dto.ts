import { Persona } from 'src/personas/entities/persona.entity';
import { Genero } from '../entities/datos_medico.entity';

export class CreateDatosMedicoDto {
  empleado: Persona;
  alergias: string;
  enfercronicas: string;
  lesiones: string;
  alergiasmed: string;
  numemergencia: string;
  numseguro: string;
  tiposangre: string;
  nombremergencia: string;
  genero: Genero;
  relaemergencia: string;
}
