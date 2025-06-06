import { Contrato } from 'src/contrato/entities/contrato.entity';
import { Docsubcontratado } from 'src/docsubcontratado/entities/docsubcontratado.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EstadoSubcontratado {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}
@Entity()
export class Subcontratado {
  @PrimaryGeneratedColumn()
  idsubcontratado: number;

  @Column({ default: null })
  nombre: string;

  @Column({ default: null, length: 13 })
  rfc: string;

  @Column({ default: null })
  nss: string;

  @Column({ default: null })
  ine: string;

  @Column({ default: null, length: 18 })
  curp: string;

  @Column({
    type: 'enum',
    enum: EstadoSubcontratado,
    default: EstadoSubcontratado.ACTIVO,
  })
  estado: EstadoSubcontratado;

  @Column({ default: null })
  doc: string;

  @OneToOne(
    () => Docsubcontratado,
    (docsubcontratado) => docsubcontratado.subcontratado,
    {
      cascade: ['insert'],
    },
  )
  docsubcontratado: Docsubcontratado;

  @ManyToOne(() => Contrato, (contrato) => contrato.subcontratos)
  @JoinColumn({ name: 'idContrato' })
  contrato: Contrato;
}
