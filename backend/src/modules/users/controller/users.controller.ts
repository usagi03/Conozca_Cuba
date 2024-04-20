import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number): number{
    return this.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto): User{
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number){
    return this.userService.removeUser(id);
  }
}
