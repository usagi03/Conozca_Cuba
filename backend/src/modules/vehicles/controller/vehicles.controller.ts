import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { VehcileServiceService } from "../vehcile-service/vehcile-service.service";
import { Vehicle } from "../vehicle.entity";
import { CreateVehicleDto, UpdateVehicleDto } from "../dto";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly VehicleServiceService: VehcileServiceService) {}

  @Get()
  async getVehicles(): Promise<Vehicle[]> {
    return this.VehicleServiceService.getVehicles();
  }

  @Get(":id")
  async getVehicle(@Param("id") id: number): Promise<Vehicle> {
    return this.VehicleServiceService.getVehicle(id);
  }

  @Post()
  async createVehicle(@Body() vehicle: CreateVehicleDto): Promise<Vehicle> {
    return this.VehicleServiceService.createVehicle(vehicle);
  }

  @Patch(":id")
  async updateVehicle(
    @Param("id") id: number,
    @Body() vehicle: UpdateVehicleDto
  ): Promise<Vehicle> {
    return this.VehicleServiceService.updateVehicle(id, vehicle);
  }

  @Delete(":id")
  async removeVehicle(@Param("id") id: number): Promise<void> {
    return this.VehicleServiceService.removeVehicle(id);
  }
}
