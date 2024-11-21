import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cambio {
  @PrimaryGeneratedColumn()
  idcambio: number;

  @Column({ default: null })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  idusuario: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @Column()
  tablacambio: string;
}
