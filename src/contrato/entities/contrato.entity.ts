import { Convenio } from 'src/convenio/entities/convenio.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Fianza } from 'src/fianza/entities/fianza.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { PersonalContrato } from 'src/personal_contrato/entities/personal_contrato.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';
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

  @ManyToMany(() => OrdenServicio, (orden) => orden.contratos)
  ordenes: Array<OrdenServicio>;

  @Column({ nullable: true })
  idcontratofuente: string;

  @Column({ nullable: true })
  numerocontrato?: string;

  @Column({ type: 'date', nullable: true })
  iniciocontrato: Date;

  @Column({ type: 'date', nullable: true })
  fincontrato: Date;

  @OneToMany(() => Convenio, (convenio) => convenio.contrato)
  convenios: Array<Convenio>;

  @OneToMany(() => Fianza, (fianza) => fianza.contrato)
  fianzas: Fianza[];

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montocontrato: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  anticipocontrato: number;

  @Column({ default: null })
  direccion: string;

  @Column({
    default: TipoSubcontrato.ContratoOrigen,
    type: 'enum',
    enum: TipoSubcontrato,
  })
  subcontrato: TipoSubcontrato;

  @OneToMany(() => Subcontratado, (sub) => sub.contrato)
  subcontratos: Subcontratado[];

  @OneToMany(() => Factura, (factura) => factura.contrato)
  facturas: Array<Factura>;

  @OneToMany(
    () => PersonalContrato,
    (personalcontrato) => personalcontrato.contrato,
    {
      cascade: ['remove'],
      onDelete: 'CASCADE',
    },
  )
  personalcontrato: Array<PersonalContrato>;
}
