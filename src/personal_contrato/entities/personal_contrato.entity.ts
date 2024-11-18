import { Contrato } from 'src/contrato/entities/contrato.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
export enum TipoPersonal {
  Terceros = 'terceros',
  Oceanus = 'oceanus',
}
@Entity()
export class PersonalContrato {
  @PrimaryGeneratedColumn()
  id: number;

  //@Column()
  //idpersonal: number;
  @ManyToOne(() => Persona, (persona) => persona.personalcontrato)
  persona: Persona;

  //@Column()
  //idcontrato: number;
  @ManyToOne(() => Contrato, (contrato) => contrato.personalcontrato)
  contrato: Contrato;

  @Column({ type: 'enum', enum: TipoPersonal, default: TipoPersonal.Terceros })
  tipopersonal: TipoPersonal;
}
