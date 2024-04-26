import { Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/loginDto.dto';
import { Request } from 'express';
import { AuthGuard } from '../guard/auth.guard';

interface RequestWithUser extends Request {
  user: {
    username: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: RequestWithUser) {
    return req.user;
  }
}

