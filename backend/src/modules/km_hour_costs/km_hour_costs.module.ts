import { Module } from "@nestjs/common";
import { KmCostCoController } from "./km_cost_co/km_cost_co.controller";
import { KmCostSService } from "./km_cost_s/km_cost_s.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KmHoursCost } from "./km_hours_cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([KmHoursCost])],
  controllers: [KmCostCoController],
  providers: [KmCostSService],
})
export class KmHourCostsModule {}
