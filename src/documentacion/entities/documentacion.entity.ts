import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Documentacion {
  @PrimaryGeneratedColumn()
  iddocumento: number;

  @Column({ nullable: false })
  credencial: string;

  @Column({ nullable: false })
  licencia: string;

  @Column({ nullable: false })
  pasaporte: string;

  @Column({ nullable: false })
  cv: string;

  @Column({ nullable: false })
  curp: string;

  @Column({ nullable: false })
  inss: string;

  @Column({ nullable: false })
  constanciasat: string;

  @Column({ nullable: false })
  foto: string;

  @Column({ default: null })
  actnacimiento: string;

  @Column({ default: null })
  estcuenta: string;

  @Column({ default: null })
  altasegsocial: string;

  @Column({ default: null })
  cedulaprofe: string;

  @Column({ default: null })
  copiacontrato: string;

  @Column({ default: null })
  comprodomicilio: string;

  @OneToOne(() => Persona, (persona) => persona.documentacion)
  empleado: Persona;
}
