import { Empresa } from 'src/empresa/entities/empresa.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmpresaPersonal {
  @PrimaryGeneratedColumn()
  idempresapersonal: number;

  @ManyToOne(() => Persona, (persona) => persona.empresapersonal)
  persona: Persona;

  @ManyToOne(() => Empresa, (empresa) => empresa.empresapersonal)
  empresa: Empresa;

  @Column({ default: null })
  terceros: boolean;
}
