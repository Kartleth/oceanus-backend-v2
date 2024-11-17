import { timestamp } from 'rxjs';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  idcontrato: number;

  @Column({ default: null })
  titulo: string;

  @Column({ default: '0' })
  nombrecontrato: string;

  @Column({ default: 0 })
  idcontratante: number;

  @Column({ default: 0 })
  idcontratado: number;

  @Column({ default: 'Contrato Origen' })
  subcontrato: string;

  @Column()
  idcontratofuente: number;

  @Column({ default: null })
  numerocontrato: number;

  @Column({ type: 'timestamp' })
  iniciocontrato: Date;

  @Column({ type: 'timestamp' })
  fincontrato: Date;

  @ManyToMany(() => Convenio, (convenio) => convenio.contratos)
  @JoinTable({ name: 'contrato_convenio' })
  convenios: Array<Convenio>;

  @ManyToMany(() => Fianza, (fianza) => fianza.contratos)
  @JoinTable({ name: 'contrato_fianza' })
  fianzas: Array<Fianza>;

  //@Column({default:null})
  //idconvenio:number

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montocontrato: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  anticipocontrato: number;

  @Column({ default: null })
  direccion: string;
}
