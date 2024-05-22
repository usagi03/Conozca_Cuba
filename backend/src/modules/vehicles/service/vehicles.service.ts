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
    const vehicle = this.vehicleRepository.create(newVehicle);
    return this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(id_vehicle: number, newVehicle: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.preload({
        id_vehicle,
        license_plate: newVehicle.license_plate,
        brand: newVehicle.brand,
        luggage_capacity: newVehicle.luggage_capacity,
        with_luggage: newVehicle.with_luggage,
        total_capacity: newVehicle.total_capacity,
        year_built: newVehicle.year_built
    });

    if (!vehicle) {
        throw new NotFoundException('Resource not found');
    }

    await this.vehicleRepository.save(vehicle);
    return vehicle;
  }

  async removeVehicle(id: number): Promise<string> {
    const vehicle: Vehicle = await this.vehicleRepository.findOne({ where: { id_vehicle: id } } as FindOneOptions<Vehicle>);
    let ok: string = 'NO ELIMINADO';

    if (!vehicle) {
        throw new NotFoundException('Resource not found');
    } else {
        ok = 'ELIMINADO';
    }

    await this.vehicleRepository.remove(vehicle);
    return ok;
}
}
