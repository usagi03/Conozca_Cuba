import { Module } from "@nestjs/common";
import { VehcileServiceService } from "./vehcile-service/vehcile-service.service";
import { VehiclesController } from "./controller/vehicles.controller";
import { Vehicle } from "./vehicle.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehcileServiceService],
})
export class VehiclesModule {}
