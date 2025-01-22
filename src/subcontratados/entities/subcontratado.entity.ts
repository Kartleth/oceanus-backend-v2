import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  estado: string;

  @Column({ default: null })
  doc: string;
}
