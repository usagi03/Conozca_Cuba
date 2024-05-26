import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Km_cost } from "./km_cost.entity";
import { Km_costsController } from "./controller/km_costs.controller";
import { Km_costsService } from "./service/km_costs.service";
import { TransportationModelsService } from "../transportation_models/service/transportation_models..service";
import { Transportation_model } from "../transportation_models/model.entity";
import { TransportationModelsModule } from "../transportation_models/transportation_models.module";

@Module({
  imports: [TypeOrmModule.forFeature([Km_cost, Transportation_model]), TransportationModelsModule],
  controllers: [Km_costsController],
  providers: [Km_costsService, TransportationModelsService],
})
export class KmCostsModule {}
