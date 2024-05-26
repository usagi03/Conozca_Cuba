import { Module } from "@nestjs/common";
import { RoutesController } from "./controller/routes.controller";
import { RoutesService } from "./service/routes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "./route.entity";
import { Transportation_model } from "../transportation_models/model.entity";
import { TransportationModelsModule } from "../transportation_models/transportation_models.module";
import { TransportationModelsService } from "../transportation_models/service/transportation_models..service";

@Module({
  imports: [TypeOrmModule.forFeature([Route, Transportation_model]), TransportationModelsModule],
  controllers: [RoutesController],
  providers: [RoutesService, TransportationModelsService],
})
export class RoutesModule {}
