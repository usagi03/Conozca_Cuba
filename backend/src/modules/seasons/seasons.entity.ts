import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import { Acommodation } from "../acommodations/acommodations.entity";

@Entity("season")
export class Season {
    @PrimaryGeneratedColumn('increment')
    id_season: number;

    @Column({ nullable: false })
    name_season: string;

    @Column({ nullable: false })
    start_season: Timestamp;

    @Column({ nullable: false })
    end_season: Timestamp;

    @Column({ nullable: false })
    description_season: Timestamp;

    @OneToMany(() => Acommodation, (acommodation) => acommodation.season)
    seasons: Season[];
}