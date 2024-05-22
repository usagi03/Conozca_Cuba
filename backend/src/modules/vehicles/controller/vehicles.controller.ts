import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { VehiclesService } from "../service/vehicles.service";
import { Vehicle } from "../vehicle.entity";
import { CreateVehicleDto, UpdateVehicleDto } from "../dtos";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get()
  async getVehicles(): Promise<Vehicle[]> {
    return this.vehicleService.getVehicles();
  }

  @Get(":id_vehicle")
  async getVehicle(@Param("id_vehicle") id: number): Promise<Vehicle> {
    return this.vehicleService.getVehicle(id);
  }

  @Post()
  async createVehicle(@Body() vehicle: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.createVehicle(vehicle);
  }

  @Patch(':id_vehicle')
  updateVehicle(@Param('id_vehicle') id: number, @Body() vehicle: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.updateVehicle(id, vehicle);
  }

  @Delete(':id_vehicle')
  deleteVehicle(@Param('id_vehicle') id: number): Promise<string> {
    return this.vehicleService.removeVehicle(id);
  }
}
