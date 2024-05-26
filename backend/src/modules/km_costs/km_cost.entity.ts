import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("km_cost")
export class Km_cost {
  @PrimaryGeneratedColumn()
  id_transp_model: number;

  @Column({ nullable: false })
  km_cost: number;

  @Column({ nullable: false })
  full_ride_cost: number;

  @Column({ nullable: false })
  waited_hours_cost: number;
}
