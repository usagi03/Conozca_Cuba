import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./contract.entity";
import { ContractsService } from "./service/contracts.service";
import { ContractsController } from "./controller/contracts.controller";
import { Acommodation } from "../acommodations/acommodations.entity";
import { Transportation } from "../transportations/transportation.entity";
import { Daily_activity } from "../activities/activities.entity";
import { AcommodationsModule } from "../acommodations/acommodations.module";
import { TransportationsModule } from "../transportations/transportations.module";
import { ActivitiesModule } from "../activities/activities.module";
@Module({
  imports: [TypeOrmModule.forFeature([Contract, Acommodation, Transportation, Daily_activity]), AcommodationsModule, TransportationsModule, ActivitiesModule],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
