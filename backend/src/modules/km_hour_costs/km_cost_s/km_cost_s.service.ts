import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { KmHoursCost } from "../km_hours_cost.entity";
import { Repository } from "typeorm";
import { CreateKmHoursCost } from "../dto/create.Dto";
import { UpdateKmHoursCost } from "../dto/update.Dto";

@Injectable()
export class KmCostSService {
  constructor(
    @InjectRepository(KmHoursCost)
    private readonly kmHoursCostRepository: Repository<KmHoursCost>
  ) {}

  async getAll(): Promise<KmHoursCost[]> {
    return await this.kmHoursCostRepository.find();
  }

  async getRoute(id: number): Promise<KmHoursCost> {
    const aux = await this.kmHoursCostRepository.find();
    const e = aux.find((aux) => aux.id_transp_model === id);

    if (!e) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }

    return e;
  }

  async createKmHoursCost({
    type_transp_model,
    description_tm,
    route_km_cost,
    hours_cost,
    extra_km_cost,
    extras_hours_cost,
  }: CreateKmHoursCost) {
    const aux: KmHoursCost = this.kmHoursCostRepository.create({
      type_transp_model,
      description_tm,
      route_km_cost,
      hours_cost,
      extra_km_cost,
      extras_hours_cost,
    });
    return this.kmHoursCostRepository.save(aux);
  }

  async updateKmHoursCost(
    id: number,
    {
      type_transp_model,
      description_tm,
      route_km_cost,
      hours_cost,
      extra_km_cost,
      extras_hours_cost,
    }: UpdateKmHoursCost
  ) {
    const aux: KmHoursCost = await this.kmHoursCostRepository.preload({
      type_transp_model,
      description_tm,
      route_km_cost,
      hours_cost,
      extra_km_cost,
      extras_hours_cost,
    });

    if (!aux) {
      throw new NotFoundException("Resource not found");
    }
    return this.kmHoursCostRepository.save(aux);
  }

  async remove(id: number): Promise<void> {
    const aux = await this.kmHoursCostRepository.find();
    const e = aux.find((aux) => aux.id_transp_model === id);
    if (!e) {
      throw new NotFoundException("Resource not found");
    } else {
      this.kmHoursCostRepository.remove(e);
    }
  }
}
