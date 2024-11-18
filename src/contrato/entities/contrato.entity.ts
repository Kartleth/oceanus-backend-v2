import { timestamp } from 'rxjs';
import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum TipoSubcontrato {
  Subcontrato = 'subcontrato',
  ContratoOrigen = 'contrato origen',
  Cotizacion = 'cotizacion',
}
@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  idcontrato: number;

  @Column({ default: null })
  titulo: string;

  @Column({ default: '0' })
  nombrecontrato: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.contratosEmitidos)
  @JoinColumn({ name: 'idcontratante' })
  contratante: Empresa;

  @ManyToOne(() => Empresa, (empresa) => empresa.contratosRecibidos)
  @JoinColumn({ name: 'idcontratado' })
  contratado: Empresa;

  @OneToMany(()=>Factura,(factura)=>factura.contrato)
  facturas:Array<Factura>

  @ManyToMany(() => OrdenServicio, (orden) => orden.contratos)
  ordenes: Array<OrdenServicio>;

  @OneToMany(
    () => PersonalContrato,
    (personalcontrato) => personalcontrato.contrato,
  )
  personalcontrato: Array<PersonalContrato>;

  @Column({
    default: TipoSubcontrato.ContratoOrigen,
    type: 'enum',
    enum: TipoSubcontrato,
  })
  subcontrato: TipoSubcontrato;

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

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montocontrato: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  anticipocontrato: number;

  @Column({ default: null })
  direccion: string;
}
