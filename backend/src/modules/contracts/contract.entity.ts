import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Transportation } from "../transportations/transportation.entity";
import { Acommodation } from "../acommodations/acommodations.entity";
import { Daily_activity } from "../activities/activities.entity";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("increment")
  id_contract: number;

  @Column()
  start_contract: Date;

  @Column()
  end_contract: Date;

  @Column()
  resolution_contract: Date;

  @Column()
  description: string;

  @ManyToOne(() => Transportation, (transportation) => transportation.id_transportation, {
      eager: true,
    })
    @JoinColumn({name: 'id_transportation'})
    transportation: Transportation;

  @ManyToOne(() => Acommodation, (acommodation) => acommodation.id_acommodation, {
      eager: true, 
    })
    @JoinColumn({name: 'id_acommodation'})
    acommodation: Acommodation;

  @ManyToOne(() => Daily_activity, (activity) => activity.id_activity, {
      eager: true,
    })
    @JoinColumn({name: 'id_activity'})
    activity: Daily_activity;
}
