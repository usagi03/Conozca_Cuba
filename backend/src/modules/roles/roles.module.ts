import { Module } from '@nestjs/common';
import { Role } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './service/roles.service';
import { RolesController } from './controller/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
