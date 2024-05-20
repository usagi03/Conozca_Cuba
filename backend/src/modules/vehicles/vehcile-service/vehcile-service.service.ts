import { Injectable, NotFoundException } from "@nestjs/common";
import { Vehicle } from "../vehicle.entity";
import { CreateVehicleDto, UpdateVehicleDto } from "../dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class VehcileServiceService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>
  ) {}

  async getVehicles(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find();
  }

  async getVehicle(id: number): Promise<Vehicle> {
    const car = await this.vehiclesRepository.find();
    const vehicle = car.find((car) => car.id_vehicle === id);

    if (!vehicle) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }

    return vehicle;
  }

  async createVehicle({
    license_plate,
    brand,
    luggage_capacity,
    with_luggage,
    total_capacity,
    year_built,
  }: CreateVehicleDto) {
    const vehicle: Vehicle = this.vehiclesRepository.create({
      license_plate,
      brand,
      luggage_capacity,
      with_luggage,
      total_capacity,
      year_built,
    });
    return this.vehiclesRepository.save(vehicle);
  }

  async updateVehicle(
    id: number,
    {
      license_plate,
      brand,
      luggage_capacity,
      with_luggage,
      total_capacity,
      year_built,
    }: UpdateVehicleDto
  ) {
    const vehicle: Vehicle = await this.vehiclesRepository.preload({
      license_plate,
      brand,
      luggage_capacity,
      with_luggage,
      total_capacity,
      year_built,
    });

    if (!vehicle) {
      throw new NotFoundException("Resource not found");
    }
    return this.vehiclesRepository.save(vehicle);
  }

  async removeVehicle(id: number): Promise<void> {
    const car = await this.vehiclesRepository.find();
    const vehicle = car.find((car) => car.id_vehicle === id);
    if (!vehicle) {
      throw new NotFoundException("Resource not found");
    } else {
      this.vehiclesRepository.remove(vehicle);
    }
  }
}
