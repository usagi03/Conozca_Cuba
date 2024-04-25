import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/roles.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role]), RolesModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
