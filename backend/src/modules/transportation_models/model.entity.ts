import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transportation } from "../transportations/transportation.entity";

@Entity("transportation_model")
export class Transportation_model {
  @PrimaryGeneratedColumn("increment")
  id_transp_model: number;

  @Column({ nullable: false })
  type_transp_model: string;

  @Column()
  description_tm: string;

  @OneToMany(() => Transportation, (transportation) => transportation.transportation_model)
    transportations: Transportation[];
}
