import { Persona } from 'src/personas/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum TipoParentesco {
  Madre = 'madre',
  Padre = 'padre',
  hijo = 'hijo',
  Pareja = 'pareja',
  Abuelo = 'abuelo',
  Abuela = 'abuela',
  Hermano = 'hermano',
  Hermana = 'hermana',
  Otro = 'Otro',
}
@Entity()
export class Familiar {
  @PrimaryGeneratedColumn()
  idfamiliar: number;

  @OneToOne(() => Persona)
  @JoinColumn()
  empleado: Persona;

  @Column({ type: 'enum', enum: TipoParentesco, nullable: false })
  tipoparentesco: TipoParentesco;

  @Column({ nullable: false })
  nombre_completo: string;

  @Column({ type: 'date', nullable: false })
  fechanacimiento: Date;
}
