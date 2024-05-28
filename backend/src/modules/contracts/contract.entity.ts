import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Transportation } from "../transportations/transportation.entity";
import { Acommodation } from "../acommodations/acommodations.entity";
import { Daily_activity } from "../activities/activities.entity";
import { Package } from "../packages/package.entity";

@Entity("contract")
export class Contract {
  @PrimaryGeneratedColumn("increment")
  id_contract: number;

  @Column('timestamp without time zone', {name: 'start_contract', nullable: false })
  start_contract: string;

  @Column('timestamp without time zone', {name: 'end_contract', nullable: false })
  end_contract: string;

  @Column('timestamp without time zone', {name: 'resolution_contract', nullable: false })
  resolution_contract: string;

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

  @OneToMany(() => Package, (pack) => pack.contract)
  packages: Package[];
}
