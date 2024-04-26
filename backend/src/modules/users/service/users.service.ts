import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto, /*UpdateUserDto*/ } from '../dto';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/roles.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({relations: ['role']});
    }

    async getUser(id: number): Promise<User> {
        console.log(id);
        const user = await this.userRepository.findOne({ relations: ['role'], where: { id_user: id } } as FindOneOptions<User>);
        console.log(user);

        if (!user) {
            throw new NotFoundException('Resource not found');
        }

        return user;
    }

    async createUser(newUser: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(newUser);
        user.role = { id_role: newUser.role.id_role } as Role; 
        return this.userRepository.save(user);
    }

    async updateUser(id_user: number, newUser: UpdateUserDto) {
        const user = await this.userRepository.preload({
            id_user,
            user_name: newUser.user_name,
            user_password: newUser.user_password,
            role: { id_role: newUser.role.id_role } 
        });
    
        if (!user) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.userRepository.save(user);
        return user;
    }

    async removeUser(id: number): Promise<string> {
        const user: User = await this.userRepository.findOne({ where: { id_user: id } } as FindOneOptions<User>);
        let ok: string = 'NO ELIMINADO';

        if (!user) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.userRepository.remove(user);
        return ok;
    }   
    
    /*async updateUser(id_user: number, newUser: UpdateUserDto) {
        const user: User = await this.userRepository.preload({
            id_user, 
            user_name: newUser.user_name,
            user_password: newUser.user_password,
            id_role: newUser.id_role
        });

        if (!user) {
            throw new NotFoundException('Resource not found')
        }

        await this.userRepository.save(user);

        return user;
    }  

    async findOne(username: string, pass): Promise<User> {
        const user = await this.userRepository.findOne({ where: {user_name: username, user_password: pass} })
        return user;
    }*/
}
