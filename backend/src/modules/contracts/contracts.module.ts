import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./contract.entity";
import { ContractsService } from "./service/contracts.service";
import { ContractsController } from "./controller/contracts.controller";
import { Daily_activity } from "../activities/activities.entity";
import { Acommodation } from "../acommodations/acommodations.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    TypeOrmModule.forFeature([Daily_activity]),
    TypeOrmModule.forFeature([Acommodation]),
  ],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
