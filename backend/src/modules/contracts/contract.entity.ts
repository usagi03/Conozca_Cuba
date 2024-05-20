import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  id_transportation: number;

  @Column()
  id_hotel_room_season: number;

  @Column()
  id_activity: number;
}
