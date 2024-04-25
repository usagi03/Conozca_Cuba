import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: id } } as FindOneOptions<User>);

        if (!user) {
            throw new NotFoundException('Resource not found');
        }

        return user;
    }

    async createUser(newUser: CreateUserDto) {
        const user: User = this.userRepository.create(newUser);
        return this.userRepository.save(user);
    }

    async updateUser(id_user: number, newUser: UpdateUserDto) {
        const user: User = await this.userRepository.preload({
            id_user, 
            user_name: newUser.user_name,
            user_password: newUser.user_password,
            user_role: newUser.user_role
        });

        if (!user) {
            throw new NotFoundException('Resource not found')
        }

        return user;
    } 

    async removeUser(id: number): Promise<void> {
        const user: User = await this.userRepository.findOne({ where: { id: id } } as FindOneOptions<User>);

        if (!user) {
            throw new NotFoundException('Resource not found');
        }

        this.userRepository.remove(user);
    }
}
