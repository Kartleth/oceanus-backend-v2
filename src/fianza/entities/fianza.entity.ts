import { Contrato } from 'src/contrato/entities/contrato.entity';

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum TipoCambio {
  Peso = 'peso',
  Dolar = 'dolar',
}
@Entity()
export class Fianza {
  @PrimaryGeneratedColumn()
  idfianza: number;

  @Column({ default: null })
  documento: string;

  @Column({ default: TipoCambio.Peso, type: 'enum', enum: TipoCambio })
  tipodecambio: string;

  @Column({ default: null })
  anticipodoc: string;

  @Column({ type: 'date' })
  inicio: Date;

  @Column({ type: 'date' })
  fin: Date;

  @Column({ default: null })
  poliza: string;

  @Column({ default: null })
  aseguradora: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monto: number;
}
