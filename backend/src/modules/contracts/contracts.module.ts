import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./contract.entity";
import { ContractsService } from "./service/contracts.service";
import { ContractsController } from "./controller/contracts.controller";
@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
