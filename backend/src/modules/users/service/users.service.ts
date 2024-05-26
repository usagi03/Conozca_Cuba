import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';
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

    async createUser(newUser: CreateUserDto) {
        const role = await this.validateRole(newUser.role);
        return await this.userRepository.save({
            ...newUser,
            role: role,
        });
    }

    async updateUser(id_user: number, newUser: UpdateUserDto): Promise<string> {
        let ok = "User could not be updated"
        const affectedRows = await this.userRepository.update(id_user, {
            ...newUser,
             role: newUser.role? await this.validateRole(newUser.role) : undefined,
         });
     
         if (affectedRows.affected > 0) {
             ok = "User updated successfully";
         } 
         return ok;
    }

    async removeUser(id: number): Promise<string> {
        let ok = "User deleted successfully"
        const user: User = await this.userRepository.findOne({ where: { id_user: id } } as FindOneOptions<User>);
    
         if (!user) {
             ok = "User could not be deleted";
         }
         
         await this.userRepository.remove(user);
         return ok;
    }   

    async findOnebyUsernameWithPass(username: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: {user_name: username} })
        return user;
    }

    private async validateRole(role: string) {
        const roleEntity = await this.roleRepository.findOneBy({ name_role: role });
      
        if (!roleEntity) {
          throw new BadRequestException('Role not found');
        }
      
        return roleEntity;
      }
}
