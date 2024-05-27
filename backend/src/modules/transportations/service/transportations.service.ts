import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transportation } from "../transportation.entity";
import { FindOneOptions, Repository } from "typeorm";
import { Vehicle } from "src/modules/vehicles/vehicle.entity";
import { CreateTransportationDto } from "../dtos/create-transportation.dto";
import { Transportation_model } from "src/modules/transportation_models/model.entity";
import { UpdateTransportationDto } from "../dtos";

@Injectable()
export class TransportationsService {
  constructor(
    @InjectRepository(Transportation)
    private readonly transportationRepository: Repository<Transportation>,
    @InjectRepository(Transportation)
    private readonly modelRepository: Repository<Transportation_model>,
    @InjectRepository(Transportation)
    private readonly vehicleRepository: Repository<Vehicle>) {}

  async getTransportations(): Promise<Transportation[]> {
    return await this.transportationRepository.find({relations: ['transportation_model', 'vehicle']});
  }

  async getTransportation(id: number): Promise<Transportation> {
    console.log(id);
    const transportation = await this.transportationRepository.findOne({ relations: ['transportation_model', 'vehicle'], where: { id_transportation: id } } as FindOneOptions<Transportation>);
    console.log(transportation);

    if (!transportation) {
        throw new NotFoundException('Resource not found');
    }

    return transportation;
  }

  async createTransportation(newTransportation: CreateTransportationDto): Promise<Transportation> {
    const model = await this.validateModel(newTransportation.transportation_model);
    const vehicle = await this.validateVehicle(newTransportation.vehicle);
    return await this.transportationRepository.save({
      ...newTransportation,
      transportation_model: model,
      vehicle: vehicle,
    });
  }

  async updateTransportation(id_transportation: number, newTransportation: UpdateTransportationDto) {
    let ok = "Transportation could not be updated"
        const affectedRows = await this.transportationRepository.update(id_transportation, {
            ...newTransportation,
             transportation_model: newTransportation.transportation_model? await this.validateModel(newTransportation.transportation_model) : undefined,
             vehicle: newTransportation.vehicle? await this.validateVehicle(newTransportation.vehicle) : undefined,
         });
     
         if (affectedRows.affected > 0) {
             ok = "Transportation updated successfully";
         } 
         return ok;
  }

  async removeTransportation(id: number): Promise<string> {
    let ok = "Transportation deleted successfully"
    const transportation: Transportation = await this.transportationRepository.findOne({ where: { id_transportation: id } } as FindOneOptions<Transportation>);
    
    if (!transportation) {
        ok = "Transportation could not be deleted";
    }
         
    await this.transportationRepository.remove(transportation);
    return ok;
  }

  private async validateModel(model: number) {
    const modelEntity = await this.modelRepository.findOneBy({ id_transp_model: model });
  
    if (!modelEntity) {
      throw new BadRequestException('Transportation model not found');
    }
  
    return modelEntity;
}

private async validateVehicle(vehicle: number) {
    const vehicleEntity = await this.vehicleRepository.findOneBy({ id_vehicle: vehicle });
  
    if (!vehicleEntity) {
      throw new BadRequestException('Vehicle not found');
    }
  
    return vehicleEntity;
}
}
