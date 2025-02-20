import { Contrato } from 'src/contrato/entities/contrato.entity';
import { EmpresaPersonal } from 'src/empresa_personal/entities/empresa_personal.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { OrdenServicio } from 'src/orden_servicio/entities/orden_servicio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empresa {
  static findOne(arg0: { where: { nombre: string } }) {
    throw new Error('Method not implemented.');
  }
  //Información de la empresa
  @PrimaryGeneratedColumn()
  idempresa: number;

  @Column({ nullable: true, length: 150 })
  razonsocial: string;

  @Column({ default: null })
  correo: string;

  @Column({ default: null })
  telefono: string;

  @Column({ nullable: true })
  logo: string;

  //representante legal
  @Column({ default: null })
  representantelegal: string;

  @Column({ default: null })
  correoRepresentantelegal: string;

  @Column({ default: null })
  telefonoRepresentantelegal: string;

  //Datos de facturación
  @Column({ nullable: false, length: 13 })
  rfc: string;

  @Column({ default: null })
  correofacturacion: string;

  @Column({ nullable: true, length: 200 })
  constanciafiscal: string;

  @Column({ default: null })
  tiporegimen: string;

  @Column({ default: null })
  numerocuenta: string;

  @Column({ default: null })
  banco: string;

  @Column({ default: null })
  nombrecontrato: string;

  @Column({ type: 'date', nullable: true })
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
