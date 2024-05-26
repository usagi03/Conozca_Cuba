import { Column, Entity, ChildEntity } from "typeorm";
import { Transportation_model } from "../transportation_models/model.entity";

@Entity("km_hours_cost")
@ChildEntity(Transportation_model)
export class Km_hours_cost extends Transportation_model {
  /*@PrimaryGeneratedColumn()
  id_km_hours_cost: number;*/

  @Column()
  route_km_cost: number;

  @Column()
  hours_cost: number;

  @Column()
  extra_km_cost: number;

  @Column()
  extras_hours_cost: number;
}
