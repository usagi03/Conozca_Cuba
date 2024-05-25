import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "../vehicles/vehicle.entity";
import { Transportation_model } from "../transportation_models/model.entity";
import { Contract } from "../contracts/contract.entity";

@Entity("transportation")
export class Transportation {
  @PrimaryGeneratedColumn("increment")
  id_transportation: number;

  @ManyToOne(() => Transportation_model, (transportation_model) => transportation_model.id_transp_model, {
    eager: true,
  })
  @JoinColumn({name: 'id_transp_model'})
  transportation_model: Transportation_model;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id_vehicle, {
    eager: true, 
  })
  @JoinColumn({name: 'id_vehicle'})
  vehicle: Vehicle;

  @Column({ nullable: false })
  borrower: string;

  @OneToMany(() => Contract, (contract) => contract.transportation)
    contracts: Contract[];
}
