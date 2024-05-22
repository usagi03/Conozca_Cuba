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
        const role = this.roleRepository.create(newRole);
        return this.roleRepository.save(role);
    }

    async updateRole(id_role: number, newRole: UpdateRoleDto) {
        const role = await this.roleRepository.preload({
            id_role,
            name_role: newRole.name_role,
            description_role: newRole.description_role
        });
    
        if (!role) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.roleRepository.save(role);
        return role
        ;
    }

    async removeRole(id: number): Promise<string> {
        const role: Role = await this.roleRepository.findOne({ where: { id_role: id } } as FindOneOptions<Role>);
        let ok: string = 'NO ELIMINADO';

        if (!role) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.roleRepository.remove(role);
        return ok;
    }
}
