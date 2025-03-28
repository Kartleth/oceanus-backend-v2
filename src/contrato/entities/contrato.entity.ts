import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column({ nullable: false })
  nombrecontrato: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.contratosRecibidos)
  @JoinColumn({ name: 'idcontratado' })
  contratado: Cliente;

  @OneToMany(() => Factura, (factura) => factura.contrato)
  facturas: Array<Factura>;

  @ManyToMany(() => OrdenServicio, (orden) => orden.contratos)
  ordenes: Array<OrdenServicio>;

  @OneToMany(
    () => PersonalContrato,
    (personalcontrato) => personalcontrato.contrato,
    {
      cascade: ['remove'],
      onDelete: 'CASCADE',
    },
  )
  personalcontrato: Array<PersonalContrato>;

  @Column({
    default: TipoSubcontrato.ContratoOrigen,
    type: 'enum',
    enum: TipoSubcontrato,
  })
  subcontrato: TipoSubcontrato;

  @Column({ nullable: true })
  idcontratofuente: string;

  @Column({ default: null })
  numerocontrato: string;

  @Column({ type: 'date', nullable: true })
  iniciocontrato: Date;

  @Column({ type: 'date', nullable: true })
  fincontrato: Date;

  @OneToMany(() => Convenio, (convenio) => convenio.contrato)
  convenios: Array<Convenio>;

  @OneToOne(() => Fianza)
  @JoinColumn()
  fianzaAnticipo: Fianza;

  @OneToOne(() => Fianza)
  @JoinColumn()
  fianzaOculto: Fianza;

  @OneToOne(() => Fianza)
  @JoinColumn()
  fianzaCumplimiento: Fianza;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montocontrato: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  anticipocontrato: number;

  @Column({ default: null })
  direccion: string;
}
