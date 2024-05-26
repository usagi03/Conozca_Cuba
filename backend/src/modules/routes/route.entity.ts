import { Entity, Column, ChildEntity } from "typeorm";
import { Transportation_model } from "../transportation_models/model.entity";

@Entity("route")
@ChildEntity(Transportation_model)
export class Route extends Transportation_model{
  /*@PrimaryGeneratedColumn("increment")
  id_route: number;*/

  @Column()
  description_route: string;

  @Column()
  route_cost: number;

  @Column()
  full_ride_cost: number;
}
