import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Persona } from 'src/personas/entities/persona.entity';

@Entity()
export class Documentacion {
  @PrimaryGeneratedColumn()
  iddocumento: number;

  @Column({ nullable: true })
  credencial: string;

  @Column({ nullable: true })
  licencia: string;

  @Column({ nullable: true })
  pasaporte: string;

  @Column({ nullable: true })
  cv: string;

  @Column({ nullable: true })
  curp: string;

  @Column({ nullable: true })
  inss: string;

  @Column({ nullable: true })
  constanciasat: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ nullable: true })
  actnacimiento: string;

  @Column({ nullable: true })
  estcuenta: string;

  @Column({ nullable: true })
  altasegsocial: string;

  @Column({ nullable: true })
  cedulaprofe: string;

  @Column({ nullable: true })
  copiacontrato: string;

  @Column({ nullable: true })
  comprodomicilio: string;

  @OneToOne(() => Persona, (persona) => persona.documentacion)
  empleado: Persona;
}
