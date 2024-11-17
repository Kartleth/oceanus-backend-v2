import { FianzaAnticipo } from 'src/fianza_anticipo/entities/fianza_anticipo.entity';
import { FianzaCumplimiento } from 'src/fianza_cumplimiento/entities/fianza_cumplimiento.entity';
import { FianzaViciosOculto } from 'src/fianza_vicios_ocultos/entities/fianza_vicios_oculto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
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

  @OneToOne(() => FianzaAnticipo)
  @JoinColumn()
  anticipo: FianzaAnticipo;

  @OneToOne(() => FianzaCumplimiento)
  @JoinColumn()
  cumplimiento: FianzaCumplimiento;

  @OneToOne(() => FianzaViciosOculto)
  @JoinColumn()
  ocultos: FianzaViciosOculto;
}
