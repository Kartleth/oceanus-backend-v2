import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contrato {

    @PrimaryGeneratedColumn()
    idcontrato: number

    @Column({default:null})
    titulo:string

    @Column({default:0})
    nombrecontrato:string
    
    @Column({default:0})
    idcontratante:number

    @Column({default:0})
    idcontratado:number

    @Column({default:'Contrato Origen'})
    subcontrato:string

    @Column()
    idcontratofuente:number

    @Column({default:null})
    numerocontrato:number

    @CreateDateColumn()
    iniciocontrato: Date

    @CreateDateColumn()
    fincontrato: Date

    @Column({default:null})
    idconvenio:number

    @Column()
    montocontrato:number

    @Column()
    anticipocontrato:number

    @Column({default:null})
    direccion:string

}  

