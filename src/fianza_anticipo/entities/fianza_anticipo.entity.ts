import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FianzaAnticipo {
  @PrimaryGeneratedColumn()
  idfianzaanticipo: number;

  @Column({ default: null })
  anticipodoc: string;

  @Column({ type: 'date' })
  inicio: Date;

  @Column({ type: 'date' })
  fin: Date;

  @Column({ default: null })
  poliza: string;

  @Column({ default: null })
  aseguradora: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monto: number;
}
