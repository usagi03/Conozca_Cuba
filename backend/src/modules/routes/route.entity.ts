import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("route")
export class Route {
  @PrimaryGeneratedColumn()
  id_transp_model: number;

  @Column()
  description_route: string;

  @Column({ nullable: false })
  route_cost: number;

  @Column({ nullable: false })
  full_ride_cost: number;
}
