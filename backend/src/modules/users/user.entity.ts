import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn('increment')
    id_user: number;

    @Column()
    user_name: string;

    @Column()
    user_password: string;

    @Column()
    user_role: number;
}