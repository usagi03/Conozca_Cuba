import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: 'Adrian',
            password: '1234',
            role: 'Administrador',
        },
        {
            id: 2,
            name: 'Camila',
            password: '1234',
            role: 'Gerente',
        },
        {
            id: 3,
            name: 'Jacqueline',
            password: '1234',
            role: 'Agente de ventas',
        }
    ];

    getUsers(): User[] {
        return this.users;
    }

    getUser(id: number): User {
        return this.users.find((item) => item.id === id);
    }

    createUser(user: CreateUserDto) {
        this.users.push({
            id: (Math.floor(Math.random() * 2000) + 1),
            name: user.name,
            password: user.password,
            role: user.role
        });
    }

    updateUser(id: number, user: UpdateUserDto) {
        const u: User = this.getUser(id);
        u.name = user.name;
        u.password = user.password;
        u.role = user.role;

        return u;
    }

    removeUser(id: number) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
}
