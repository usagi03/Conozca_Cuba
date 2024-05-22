import { Module } from "@nestjs/common";
import { KmControlerController } from "./controller/km_costs.controller";
import { KmServiceService } from "./service/km_costs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Km_cost } from "./km_cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Km_cost])],
  controllers: [KmControlerController],
  providers: [KmServiceService],
})
export class KmCostsModule {}
