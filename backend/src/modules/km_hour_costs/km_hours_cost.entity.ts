import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class KmHoursCost {
  @PrimaryGeneratedColumn()
  id_transp_model: number;

  @Column()
  type_transp_model: string;

  @Column()
  description_tm: string;

  @Column()
  route_km_cost: number;

  @Column()
  hours_cost: number;

  @Column()
  extra_km_cost: number;

  @Column()
  extras_hours_cost: number;
}
