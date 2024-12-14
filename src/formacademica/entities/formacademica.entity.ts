import { Persona } from 'src/personas/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Formacademica {
  @PrimaryGeneratedColumn()
  idacademicos: number;

  @OneToOne(() => Persona, (persona) => persona.datosAcademicos)
  empleado: Persona;

  @Column({ nullable: false })
  cedula: string;

  @Column({ nullable: false })
  carrera: string;

  @Column({ type: 'text' })
  explaboral: string;

  @Column({ type: 'text' })
  certificaciones: string;

  @Column({ default: null })
  gradoestudios: string;
}
