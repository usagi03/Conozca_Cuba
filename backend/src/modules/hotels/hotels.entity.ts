import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp} from "typeorm";
import { Acommodation } from "../acommodations/acommodations.entity";

@Entity("hotel")
export class Hotel {
    @PrimaryGeneratedColumn('increment')
    id_hotel: number;

    @Column({ nullable: false })
    name_hotel: string;

    @Column({ nullable: false })
    category_hotel: string;

    @Column({ nullable: false })
    address_hotel: string;

    @Column({ nullable: false })
    province_hotel: string;

    @Column({ nullable: false })
    date_hotel: Timestamp;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    fax: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    distance_to_city: Double;

    @Column({ nullable: false })
    distance_to_airport: Double;

    @Column({ nullable: false })
    floor_count: number;

    @Column({ nullable: false })
    business_model: string;

    @Column({ nullable: false })
    location_hotel: string;

    @OneToMany(() => Acommodation, (acommodation) => acommodation.hotel)
    hotels: Hotel[];
}