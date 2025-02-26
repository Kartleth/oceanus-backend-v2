import { Contrato } from 'src/contrato/entities/contrato.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Convenio {
  @PrimaryGeneratedColumn()
  idconvenio: number;

  @Column({ type: 'date', nullable: true })
  fechainicio: Date;

  @Column({ type: 'date', nullable: true })
  fechafinal: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  montoadicional: number;

  @Column({ nullable: true })
  documento: string;

  @ManyToOne(() => Contrato, (contrato) => contrato.convenios)
  contrato: Contrato;
}
