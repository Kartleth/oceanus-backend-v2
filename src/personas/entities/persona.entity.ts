import { EmpresaPersonal } from 'src/empresa_personal/entities/empresa_personal.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 18 })
  nombre: string;

  @Column({ type: 'date', nullable: false })
  fechanacimiento: Date;

  @Column({ nullable: false, length: 18 })
  curp: string;

  @Column({ nullable: false, length: 13 })
  rfc: string;

  @Column({ default: null, length: 13 })
  numerofijo: string;

  @Column({ nullable: false, length: 13 })
  numerocelular: string;

  @Column({ nullable: false, length: 150 })
  direccion: string;

  @Column({ default: null, length: 15 })
  numerolicencia: string;

  @Column({ default: null, length: 9 })
  numeropasaporte: string;

  @Column({ type: 'date' })
  fechaingreso: Date;

  @Column({ length: 20 })
  estado: string;

  @Column({ default: null, length: 50 })
  tipocontrato: string;

  @Column({ type: 'date' })
  iniciocontrato: Date;

  @Column({ type: 'date' })
  fincontrato: Date;

  @Column({ default: null, length: 50 })
  correo: String;

  @Column({ default: null, length: 20 })
  ine: String;

  @Column({ default: null, length: 20 })
  estadocivil: String;

  @OneToMany(
    () => EmpresaPersonal,
    (empresapersonal) => empresapersonal.empresa,
  )
  empresapersonal: EmpresaPersonal;
}
