import { Module } from '@nestjs/common';
import { Role } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service/service.service';
import { RolesController } from './controller/roles/roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [ServiceService]
})
export class RolesModule {}
