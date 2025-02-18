import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmpresaPersonal {
  @PrimaryGeneratedColumn()
  idempresapersonal: number;

  @ManyToOne(() => Persona, (persona) => persona.empresapersonal)
  persona: Persona;

  @ManyToOne(() => Cliente, (cliente) => cliente.empresapersonal)
  cliente: Cliente;

  @Column({ default: null })
  terceros: boolean;
}
