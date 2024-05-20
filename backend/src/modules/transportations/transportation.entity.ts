import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Transportation {
  @PrimaryGeneratedColumn("increment")
  id_transportation: number;

  @Column()
  borrower: string;
}
