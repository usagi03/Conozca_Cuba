import { Module } from "@nestjs/common";
import { ContractController } from "./contract/contract.controller";
import { ContractSService } from "./contract-s/contract-s.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./contract.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [ContractSService],
  controllers: [ContractController],
})
export class ContractsModule {}
