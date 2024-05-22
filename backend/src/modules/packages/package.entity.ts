import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Contract } from "../contracts/contract.entity";

@Entity("package")
export class Package {
    @PrimaryGeneratedColumn('increment')
    id_package: number;

    @Column({ unique: true, nullable: false })
    promotional_name: string;

    @Column({ nullable: false })
    days_count: number;

    @Column({ nullable: false })
    nigths_count: number;

    @Column({ nullable: false })
    pax_count: number;

    @Column({ nullable: false })
    hotel_airport_ride_cost: number;

    @Column({ nullable: false })
    percent_profit: number;

    @ManyToOne(() => Contract, (contract) => contract.id_contract, {
        eager: true,
      })
      @JoinColumn({name: 'id_contract'})
      contract: Contract;
}