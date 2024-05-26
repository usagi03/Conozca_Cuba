import { Injectable, NotFoundException } from "@nestjs/common";
import { Vehicle } from "../vehicle.entity";
import { CreateVehicleDto, UpdateVehicleDto } from "../dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>
  ) {}

  async getVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  async getVehicle(id: number): Promise<Vehicle> {
    console.log(id);
    const vehicle = await this.vehicleRepository.findOne({ where: { id_vehicle: id } });
    console.log(vehicle);

    if (!vehicle) {
        throw new NotFoundException('Resource not found');
    }

    return vehicle;
  }

  async createVehicle(newVehicle: CreateVehicleDto): Promise<Vehicle> {
    return await this.vehicleRepository.save({
      ...newVehicle,
  });
  }

  async updateVehicle(id_vehicle: number, newVehicle: UpdateVehicleDto) {
    let ok = "Vehicle could not be updated"
        const affectedRows = await this.vehicleRepository.update(id_vehicle, {
            ...newVehicle,
         });
     
         if (affectedRows.affected > 0) {
             ok = "Vehicle updated successfully";
         } 
         return ok;
  }

  async removeVehicle(id: number): Promise<string> {
    let ok = "Vehicle deleted successfully"
    const vehicle: Vehicle = await this.vehicleRepository.findOne({ where: { id_vehicle: id } } as FindOneOptions<Vehicle>);
    
    if (!vehicle) {
        ok = "Vehicle could not be deleted";
    }
         
    await this.vehicleRepository.remove(vehicle);
    return ok;
  }
}
