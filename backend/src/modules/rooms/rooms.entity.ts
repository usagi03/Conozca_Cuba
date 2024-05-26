import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Meal_plan } from "../meal_plans/plans.entity";
import { Acommodation } from "../acommodations/acommodations.entity";

@Entity("room")
export class Room {
    @PrimaryGeneratedColumn('increment')
    id_room: number;

    @Column({ nullable: false })
    room_number: string;

    @Column({ nullable: false })
    room_type: string;

    @Column({ nullable: false })
    room_cost: number;;

    @Column({ nullable: false })
    room_surcharge: number;;

    @ManyToOne(() => Meal_plan, (plan) => plan.id_plan, {
        eager: true, // para que traiga los planes al hacer un findOne
      })
      @JoinColumn({name: 'id_plan'})
      plan: Meal_plan;
    
    @OneToMany(() => Acommodation, (acommodation) => acommodation.room)
    acommodations: Acommodation[];
}