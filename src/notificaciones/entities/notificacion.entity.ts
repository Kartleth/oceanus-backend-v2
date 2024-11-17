import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  idnotificacion: number;

  @Column({ default: null })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ default: null })
  vinculorelacionado: string;

  @Column({ default: 'activo' })
  estado: string;

  @Column({ default: null })
  tabla: string;

  @Column()
  idtabla: number;
}
