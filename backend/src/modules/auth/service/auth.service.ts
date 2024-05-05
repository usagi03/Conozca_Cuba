import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/service/users.service';
import { LoginDto } from '../dto/loginDto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ username, password }: LoginDto) {
    console.log(username, password)
    const user = await this.usersService.findOnebyUsernameWithPass(username);
    if (!user) {
      throw new UnauthorizedException('username is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.user_password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = { username: user.user_name, role: user.role.name_role};
    const token = await this.jwtService.signAsync(payload);

    const role = user.role.name_role

    return {
      token,
      username,
      role
    };
  }
}
