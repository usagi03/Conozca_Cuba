import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "../roles/roles.entity";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn('increment')
    id_user: number;

    @Column({ unique: true, nullable: false })
    user_name: string;

    @Column({ nullable: false })
    user_password: string;

    @ManyToOne(() => Role, (role) => role.id_role, {
        eager: true, // para que traiga los roles al hacer un findOne
      })
      @JoinColumn({name: 'id_role'})
      role: Role;
}