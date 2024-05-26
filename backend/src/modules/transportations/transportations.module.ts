import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transportation } from "./transportation.entity";
import { TransportationsService } from "./service/transportations.service";
import { TransportationsController } from "./controller/transportations.controller";
import { Transportation_model } from "../transportation_models/model.entity";
import { Vehicle } from "../vehicles/vehicle.entity";
import { TransportationModelsModule } from "../transportation_models/transportation_models.module";
import { VehiclesModule } from "../vehicles/vehicles.module";

@Module({
  imports: [TypeOrmModule.forFeature([Transportation, Transportation_model, Vehicle]), TransportationModelsModule, VehiclesModule],
  controllers: [TransportationsController],
  providers: [TransportationsService],
})
export class TransportationsModule {}
