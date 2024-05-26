import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Transportation } from "../transportations/transportation.entity";

@Entity("vehicle")
export class Vehicle {
  @PrimaryGeneratedColumn("increment")
  id_vehicle: number;

  @Column({ nullable: false })
  license_plate: string;

  @Column()
  brand: string;

  @Column({ nullable: false })
  luggage_capacity: number;

  @Column({ nullable: false })
  with_luggage_capacity: number;

  @Column()
  total_capacity: number;

  @Column()
  year_build: number;

  @OneToMany(() => Transportation, (transportation) => transportation.id_transportation)
    transportations: Transportation[];
}
