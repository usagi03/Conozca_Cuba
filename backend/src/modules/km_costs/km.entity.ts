import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Km_cost {
  @PrimaryGeneratedColumn("increment")
  id_transp_model: number;

  @Column()
  type_trans_model: string;

  @Column()
  description: string;

  @Column()
  km_cost: number;

  @Column()
  full_ride_cost: number;

  @Column()
  waited_hours_cost: number;
}
