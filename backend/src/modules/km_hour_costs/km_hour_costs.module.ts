import { Module } from "@nestjs/common";
import { KmCostCoController } from "./controller/km_hours_costs.controller";
import { KmCostSService } from "./service/km_hours_costs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KmHoursCost } from "./km_hours_cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([KmHoursCost])],
  controllers: [KmCostCoController],
  providers: [KmCostsService],
})
export class KmHourCostsModule {}
