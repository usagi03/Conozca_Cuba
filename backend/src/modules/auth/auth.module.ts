import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
/*import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';*/

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
