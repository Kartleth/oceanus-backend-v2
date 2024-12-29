import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
export enum Genero {
  Masculino = 'masculino',
  Femenino = 'femenino',
  Otro = 'otro',
}
@Entity()
export class DatosMedico {
  @PrimaryGeneratedColumn()
  idmedicos: number;

  @OneToOne(() => Persona, (persona) => persona.datosMedicos)
  empleado: Persona;

  @Column({ default: null })
  alergias: string;

  @Column({ default: null })
  enfercronicas: string;

  @Column({ default: null })
  lesiones: string;

  @Column({ default: null })
  alergiasmed: string;

  @Column({ nullable: false })
  numemergencia: string;

  @Column({ nullable: false })
  numseguro: string;

  @Column({ nullable: false })
  tiposangre: string;

  @Column({ default: null })
  nombremergencia: string;

  @Column({ type: 'enum', enum: Genero, default: null })
  genero: Genero;

  @Column({ default: null })
  relaemergencia: string;
}
