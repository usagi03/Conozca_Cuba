import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { Role } from '../roles.entity';
import { RolesService } from '../service/roles.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService){}

  @Get()
  getRoles(): Promise<Role[]> {
    return this.roleService.getRoles();
  }

  @Get(':id_role')
  getRole(@Param('id_role') id: number): Promise<Role> {
    return this.roleService.getRole(id);
  }

  @Post()
  createRole(@Body() role: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Patch(':id_role')
  updateRole(@Param('id_role') id: number, @Body() role: UpdateRoleDto): Promise<Role> {
    return this.roleService.updateRole(id, role);
  }

  @Delete(':id_role')
  deleteRole(@Param('id_role') id: number): Promise<string> {
    return this.roleService.removeRole(id);
  }
}
