import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum UserType {
  User = 'user',
  Administrador = 'administrador',
}
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 25, unique: true })
  usuario: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: UserType.User, type: 'enum', enum: UserType })
  type: UserType;
}
