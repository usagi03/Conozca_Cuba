import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Room } from "../rooms/rooms.entity";

@Entity("meal_plan")
export class Meal_plan {
    @PrimaryGeneratedColumn('increment')
    id_plan: number;

    @Column({ nullable: false })
    plan_type: string;

    @Column({ nullable: false })
    plan_cost: Double;

    @OneToMany(() => Room, (room) => room.plan)
    rooms: Room[];
}