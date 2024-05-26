import { Entity, Column, ChildEntity } from "typeorm";
import { Transportation_model } from "../transportation_models/model.entity";

@Entity("km_cost")
@ChildEntity(Transportation_model)
export class Km_cost extends Transportation_model {
  /*@PrimaryGeneratedColumn("increment")
  id_km_cost: number;*/

  @Column()
  description: string;

  @Column()
  km_cost: number;

  @Column()
  full_ride_cost: number;

  @Column()
  waited_hours_cost: number;
}
