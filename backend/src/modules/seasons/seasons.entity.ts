import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Acommodation } from "../acommodations/acommodations.entity";

@Entity("season")
export class Season {
    @PrimaryGeneratedColumn('increment')
    id_season: number;

    @Column({ nullable: false })
    name_season: string;

    @Column('timestamp without time zone', {name: 'start_season', nullable: false })
    start_season:string;

    @Column('timestamp without time zone', {name: 'end_season', nullable: false })
    end_season: string;

    @Column()
    description_season: string;

    @OneToMany(() => Acommodation, (acommodation) => acommodation.room)
    acommodations: Acommodation[];
}