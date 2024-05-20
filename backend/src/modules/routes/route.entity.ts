import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Route {
  @PrimaryGeneratedColumn("increment")
  id_transp_model: number;

  @Column()
  type_trans_model: string;

  @Column()
  description: string;

  @Column()
  description_route: string;

  @Column()
  route_cost: number;

  @Column()
  full_ride_cost: number;
}
