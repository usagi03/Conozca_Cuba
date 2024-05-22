import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transportation } from "../transportation.entity";
import { FindOneOptions, Repository } from "typeorm";
import { Vehicle } from "src/modules/vehicles/vehicle.entity";
import { CreateTransportationDto } from "../dtos/create-transportation.dto";
import { Transportation_model } from "src/modules/transportation_models/model.entity";

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
    const transportation = this.transportationRepository.create(newTransportation);
    transportation.transportation_model = { id_transp_model: newTransportation.transportation_model.id_transp_model } as Transportation_model; 
    transportation.vehicle = { id_vehicle: newTransportation.vehicle.id_vehicle } as Vehicle;
    return this.transportationRepository.save(transportation);
  }

  async updateTransportation(id_transportation: number, newTransportation: CreateTransportationDto) {
    const transportation = await this.transportationRepository.preload({
        id_transportation,
        transportation_model: { id_transp_model: newTransportation.transportation_model.id_transp_model },
        vehicle: { id_vehicle: newTransportation.vehicle.id_vehicle },
        borrower: newTransportation.borrower
    });

    if (!transportation) {
        throw new NotFoundException('Resource not found');
    }

    await this.transportationRepository.save(transportation);
    return transportation;
  }

  async removeTransportation(id: number): Promise<string> {
    const transportation: Transportation = await this.transportationRepository.findOne({ where: { id_transportation: id } } as FindOneOptions<Transportation>);
    let ok: string = 'NO ELIMINADO';

    if (!transportation) {
        throw new NotFoundException('Resource not found');
    } else {
        ok = 'ELIMINADO';
    }
    
    await this.transportationRepository.remove(transportation);
    return ok;
  }
}
