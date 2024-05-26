import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Role } from '../roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>) {}

    async getRoles(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async getRole(id: number): Promise<Role> {
        console.log(id);
        const role = await this.roleRepository.findOne({ where: { id_role: id } });
        console.log(role);

        if (!role) {
            throw new NotFoundException('Resource not found');
        }

        return role;
    }

    async createRole(newRole: CreateRoleDto): Promise<Role> {
        return await this.roleRepository.save({
            ...newRole,
        });
    }

    async updateRole(id_role: number, newRole: UpdateRoleDto) {
        let ok = "Role could not be updated"
        const affectedRows = await this.roleRepository.update(id_role, {
            ...newRole,
         });
     
         if (affectedRows.affected > 0) {
             ok = "Role updated successfully";
         } 
         return ok;
    }

    async removeRole(id: number): Promise<string> {
        let ok = "Role deleted successfully"
        const role: Role = await this.roleRepository.findOne({ where: { id_role: id } } as FindOneOptions<Role>);
    
         if (!role) {
             ok = "Role could not be deleted";
         }
         
         await this.roleRepository.remove(role);
         return ok;
    }
}
