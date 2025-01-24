import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Docsubcontratado {
  @PrimaryGeneratedColumn()
  iddocsubc: number;

  @Column({ default: null })
  rfc: string;

  @Column({ default: null })
  nss: string;

  @Column({ default: null })
  ine: string;

  @Column({ default: null })
  curp: string;

  @Column({ default: null })
  foto: string;

  @OneToOne(
    () => Subcontratado,
    (subcontratado) => subcontratado.docsubcontratado,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  subcontratado: Subcontratado;
}
