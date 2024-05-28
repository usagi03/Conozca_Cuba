import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("km_cost")
export class Km_cost {
  @PrimaryColumn()
  id_transp_model: number;

  @Column({ nullable: false })
  km_cost: number;

  @Column({ nullable: false })
  full_ride_km_cost: number;

  @Column({ nullable: false })
  waiting_hours_cost: number;
}
