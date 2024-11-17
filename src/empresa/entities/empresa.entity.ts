import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  idempresa: number;

  @Column({ default: '0' })
  logo: string;

  @Column({ nullable: false, length: 13 })
  rfc: string;

  @Column({ default: '0' })
  razonsocial: string;

  @Column({ default: '0' })
  represenatelegal: string;

  @Column({ default: null })
  nombrecontrato: string;

  @Column({ default: null })
  correo: string;

  @Column({ default: null })
  telefono: string;

  @Column({ default: null })
  correofacturacion: string;

  @Column({ default: null })
  numerocuenta: string;

  @Column({ default: null })
  banco: string;

  @Column({ default: null })
  tiporegimen: string;

  @Column({ default: null, length: 200 })
  constanciafiscal: string;

  @Column({ type: 'date' })
  fechavencimientoconstancia: Date;
}
