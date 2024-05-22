import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from "../contracts/contract.entity";

@Entity("daily_activity")
export class Daily_activity {
    @PrimaryGeneratedColumn('increment')
    id_activity: number;

    @Column({ nullable: false })
    type_activity: string;

    @Column({ nullable: false })
    day_activity: number;

    @Column({ nullable: false })
    time_activity: Time;

    @Column({ nullable: false })
    cost_activity: number;

    @Column({ nullable: false })
    province_activity: string;

    @Column({ nullable: false })
    description_activity: string;

    @Column({ nullable: false })
    surcharge_activity: number;

    @OneToMany(() => Contract, (contract) => contract.activity)
    activities: Daily_activity[];
}