import { Injectable, NotFoundException } from "@nestjs/common";
import { Km_cost } from "../km.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createKm_cost } from "../dto/createKm.dto";
import { updateKm_cost } from "../dto/updateKm.dto";

@Injectable()
export class KmServiceService {
  constructor(
    @InjectRepository(Km_cost)
    private readonly kmRepository: Repository<Km_cost>
  ) {}

  async getKms(): Promise<Km_cost[]> {
    return await this.kmRepository.find();
  }

  async getKm(id: number): Promise<Km_cost> {
    const km = await this.kmRepository.find();
    const aux = km.find((km) => km.id_transp_model === id);

    if (!aux) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }

    return aux;
  }

  async createKm({
    type_trans_model,
    description,
    km_cost,
    full_ride_cost,
    waited_hours_cost,
  }: createKm_cost) {
    const aux: Km_cost = this.kmRepository.create({
      type_trans_model,
      description,
      km_cost,
      full_ride_cost,
      waited_hours_cost,
    });
    return this.kmRepository.save(aux);
  }

  async updateKm(
    id: number,
    {
      type_trans_model,
      description,
      km_cost,
      full_ride_cost,
      waited_hours_cost,
    }: updateKm_cost
  ) {
    const aux: Km_cost = await this.kmRepository.preload({
      type_trans_model,
      description,
      km_cost,
      full_ride_cost,
      waited_hours_cost,
    });

    if (!aux) {
      throw new NotFoundException("Resource not found");
    }
    return this.kmRepository.save(aux);
  }

  async deleteKm(id: number): Promise<void> {
    const km = await this.kmRepository.find();
    const aux = km.find((km) => km.id_transp_model === id);
    if (!aux) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    } else {
      this.kmRepository.remove(aux);
    }
  }
}
