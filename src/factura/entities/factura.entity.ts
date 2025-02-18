import { Contrato } from 'src/contrato/entities/contrato.entity';
import { Empresa } from 'src/empresa/entities/cliente.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  idfactura: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.facturas)
  @JoinColumn({ name: 'idempresa' })
  empresa: Empresa;

  @ManyToOne(() => Contrato, (contrato) => contrato.facturas)
  @JoinColumn({ name: 'idcontrato' })
  contrato: Contrato;

  @Column({ default: null })
  titulo: string;

  @Column({ default: null })
  numero: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  importe: number;

  @Column()
  documento: string;
}
