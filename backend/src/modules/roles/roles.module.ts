import { Module } from '@nestjs/common';
import { Role } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerController } from './controller/controller.controller';
import { ServiceService } from './service/service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [ControllerController],
  providers: [ServiceService]
})
export class RolesModule {}
