import { Contrato } from "src/contrato/entities/contrato.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Convenio {

    @PrimaryGeneratedColumn()
    idconvenio:number

    @Column({type:"timestamp"})
    fechainicio: Date

    @Column({type:"timestamp"})
    fechafinal: Date

    @Column({type:"decimal",precision:12,scale:2})
    montoadicional:number

    @Column()
    documento:string

    @ManyToMany(()=>Contrato,(contrato)=>contrato.convenios)
    contratos:Array<Contrato>

}
