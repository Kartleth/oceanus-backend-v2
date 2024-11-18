import { Contrato } from 'src/contrato/entities/contrato.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrdenServicio {
  @PrimaryGeneratedColumn()
  idorden: number;

  @Column({ default: null })
  numeroorden: string;

  @Column()
  inicioorden: string;

  @Column()
  finorden: string;

  @Column({ default: null })
  ubicacionorden: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montoorden: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  anticipo: number;

  @ManyToMany(() => Contrato, (contrato) => contrato.ordenes)
  @JoinTable({ name: 'contrato_orden' })
  contratos: Array<Contrato>;
}