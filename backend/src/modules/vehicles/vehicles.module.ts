import { Module } from "@nestjs/common";
import { VehiclesController } from "./controller/vehicles.controller";
import { Vehicle } from "./vehicle.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehiclesService } from "./service/vehicles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
