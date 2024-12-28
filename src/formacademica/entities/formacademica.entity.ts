import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Formacademica {
  @PrimaryGeneratedColumn()
  idacademicos: number;

  @Column({ nullable: false })
  cedula: string;

  @Column({ nullable: false })
  carrera: string;

  @Column({ type: 'text' })
  explaboral: string;

  @Column({ type: 'text' })
  certificaciones: string;

  @Column({ default: null })
  gradoestudios: string;
}
