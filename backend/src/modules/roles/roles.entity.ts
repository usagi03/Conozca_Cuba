import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from 'src/modules/users/user.entity';

@Entity("role")
export class Role {
    @PrimaryGeneratedColumn('increment')
    id_role: number;

    @Column({ nullable: false })
    name_role: string;

    @Column({ nullable: false })
    description_role: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}