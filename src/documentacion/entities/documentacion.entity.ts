import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Documentacion {
  @PrimaryGeneratedColumn()
  iddocumento: number;

  @Column({ default: null })
  credencial: string;

  @Column({ default: null })
  licencia: string;

  @Column({ default: null })
  pasaporte: string;

  @Column({ default: null })
  cv: string;

  @Column({ default: null })
  curp: string;

  @Column({ default: null })
  inss: string;

  @Column({ default: null })
  constanciasat: string;

  @Column({ default: null })
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
