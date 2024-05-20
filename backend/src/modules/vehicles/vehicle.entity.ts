import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn("increment")
  id_vehicle: number;

  @Column()
  license_plate: string;

  @Column()
  brand: string;

  @Column()
  luggage_capacity: number;

  @Column()
  with_luggage: number;

  @Column()
  total_capacity: number;

  @Column()
  year_built: number;
}
