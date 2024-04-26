import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id_user')
  getUser(@Param('id_user') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Patch(':id_user')
  updateUser(@Param('id_user') id: number, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id_user')
  deleteUser(@Param('id_user') id: number): Promise<string> {
    return this.userService.removeUser(id);
  }
}
