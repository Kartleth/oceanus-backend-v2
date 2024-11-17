import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subcontratado {
  @PrimaryGeneratedColumn()
  idsubcontratado: number;

  @Column({ default: null })
  nombre: string;

  @Column({ default: null, length: 13 })
  rfc: string;

  @Column({ default: null })
  inss: string;

  @Column({ default: null })
  ine: string;

  @Column({ default: null, length: 18 })
  curp: string;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ default: null })
  doc: string;
}
