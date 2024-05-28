import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("km_hours_cost")
export class Km_hours_cost {
  @PrimaryColumn()
  id_transp_model: number;

  @Column({ nullable: false })
  route_km_cost: number;

  @Column({ nullable: false })
  hours_cost: number;

  @Column({ nullable: false })
  extra_km_cost: number;

  @Column({ nullable: false })
  extras_hours_cost: number;
}
