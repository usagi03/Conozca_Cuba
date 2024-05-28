import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("route")
export class Route {
  @PrimaryColumn()
  id_transp_model: number;

  @Column()
  description_route: string;

  @Column({ nullable: false })
  route_cost: number;

  @Column({ nullable: false })
  full_ride_cost: number;
}
