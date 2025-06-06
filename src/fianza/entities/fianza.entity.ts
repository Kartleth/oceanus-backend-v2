import { Contrato } from 'src/contrato/entities/contrato.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TipoCambio {
  PESO = 'PESO',
  DOLAR = 'DOLAR',
}

export enum TipoFianza {
  ANTICIPO = 'ANTICIPO',
  OCULTO = 'OCULTO',
  CUMPLIMIENTO = 'CUMPLIMIENTO',
}

@Entity()
export class Fianza {
  @PrimaryGeneratedColumn()
  idfianza: number;

  @Column({ type: 'enum', enum: TipoFianza })
  tipo: TipoFianza;

  @Column({ default: null })
  documento: string;

  @Column({ default: TipoCambio.PESO, type: 'enum', enum: TipoCambio })
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

  @ManyToOne(() => Contrato, (contrato) => contrato.fianzas)
  @JoinColumn({ name: 'idcontrato' })
  contrato: Contrato;
}
