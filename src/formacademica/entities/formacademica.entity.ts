import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Formacademica {
  @PrimaryGeneratedColumn()
  idacademicos: number;

  @Column({ nullable: false })
  cedula: string;

  @Column({ nullable: false })
  carrera: string;

  @Column({ type: 'text' })
  explaboral: string;

  @Column({ type: 'text' })
  certificaciones: string;

  @Column({ nullable: false })
  gradoestudios: string;

  @OneToOne(() => Persona, (persona) => persona.datosAcademicos)
  empleado: Persona;
}
