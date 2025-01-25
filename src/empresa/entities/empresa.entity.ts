import { Contrato } from 'src/contrato/entities/contrato.entity';
import { EmpresaPersonal } from 'src/empresa_personal/entities/empresa_personal.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresa {
  //Información de la empresa
  @PrimaryGeneratedColumn()
  idempresa: number;

  @Column({ nullable: false })
  razonsocial: string;

  @Column({ default: null })
  correo: string;

  @Column({ default: null })
  telefono: string;

  @Column({ default: null })
  logo: string;

  //representante legal
  @Column({ default: null })
  represenatelegal: string;

  @Column({ default: null })
  correoRepresenatelegal: string;

  @Column({ default: null })
  telefonoRepresenatelegal: string;

  //Datos de facturación
  @Column({ nullable: false, length: 13 })
  rfc: string;

  @Column({ default: null })
  correofacturacion: string;

  @Column({ default: null, length: 200 })
  constanciafiscal: string;

  @Column({ default: null })
  tiporegimen: string;

  @Column({ default: null })
  numerocuenta: string;

  @Column({ default: null })
  banco: string;

  @Column({ default: null })
  nombrecontrato: string;

  @Column({ type: 'date' })
  fechavencimientoconstancia: Date;

  //otro
  @OneToMany(() => Contrato, (contrato) => contrato.contratante)
  contratosEmitidos: Array<Contrato>;

  @OneToMany(() => Contrato, (contrato) => contrato.contratado)
  contratosRecibidos: Array<Contrato>;

  @OneToMany(
    () => EmpresaPersonal,
    (empresapersonal) => empresapersonal.empresa,
  )
  empresapersonal: Array<EmpresaPersonal>;

  @OneToMany(() => Factura, (factura) => factura.empresa)
  facturas: Array<Factura>;
}
