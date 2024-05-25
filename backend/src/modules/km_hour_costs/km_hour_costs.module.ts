import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Km_hours_cost } from "./km_hours_cost.entity";
import { Km_hours_costsController } from "./controller/km_hours_costs.controller";
import { Km_hours_costsService } from "./service/km_hours_costs.service";
import { Transportation_model } from "../transportation_models/model.entity";
import { TransportationModelsModule } from "../transportation_models/transportation_models.module";
import { TransportationModelsService } from "../transportation_models/service/transportation_models..service";

@Module({
  imports: [TypeOrmModule.forFeature([Km_hours_cost, Transportation_model]), TransportationModelsModule],
  controllers: [Km_hours_costsController],
  providers: [Km_hours_costsService,  TransportationModelsService],
})
export class KmHourCostsModule {}
