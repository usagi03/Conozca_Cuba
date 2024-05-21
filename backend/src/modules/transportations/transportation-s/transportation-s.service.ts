import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transportation } from "../transportation.entity";
import { Repository } from "typeorm";
import { create_TransportationDto } from "../Dto";

@Injectable()
export class TransportationSService {
  constructor(
    @InjectRepository(Transportation)
    private readonly transportationRepository: Repository<Transportation>
  ) {}

  async getTrans(): Promise<Transportation[]> {
    return await this.transportationRepository.find();
  }

  async getT(id: number): Promise<Transportation> {
    const aux = await this.transportationRepository.find();
    const t = aux.find((aux) => aux.id_transportation === id);

    if (!t) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }

    return t;
  }

  async createT({ borrower }: create_TransportationDto) {
    const transport: Transportation = this.transportationRepository.create({
      borrower,
    });
    return this.transportationRepository.save(transport);
  }

  async updateT(id: number, { borrower }: create_TransportationDto) {
    const transport: Transportation =
      await this.transportationRepository.preload({
        borrower,
      });

    if (!transport) {
      throw new NotFoundException("Resource not found");
    }

    return this.transportationRepository.save(transport);
  }

  async removeT(id: number): Promise<void> {
    const aux = await this.transportationRepository.find();
    const t = aux.find((aux) => aux.id_transportation === id);

    if (!t) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    } else {
      this.transportationRepository.remove(t);
    }
  }
}
