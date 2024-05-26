import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Km_hours_cost } from "../km_hours_cost.entity";
import { CreateKm_hours_costDto, UpdateKm_hours_costDto } from "../dtos";

@Injectable()
export class Km_hours_costsService {
  constructor(
    @InjectRepository(Km_hours_cost)
    private readonly km_hours_costRepository: Repository<Km_hours_cost>
  ) {}

  async getKm_hours_costs(): Promise<Km_hours_cost[]> {
    return await this.km_hours_costRepository.find();
  }

  async getKm_hours_cost(id: number): Promise<Km_hours_cost> {
    console.log(id);
    const km_hours_cost = await this.km_hours_costRepository.findOne({ where: { id_transp_model: id } });
    console.log(km_hours_cost);

    if (!km_hours_cost) {
        throw new NotFoundException('Resource not found');
    }

    return km_hours_cost;
  }
  
  async createKm_hours_cost(newKm_hours_cost: CreateKm_hours_costDto): Promise<Km_hours_cost> {
    const km_hours_cost = this.km_hours_costRepository.create(newKm_hours_cost);
    return this.km_hours_costRepository.save(km_hours_cost);
  }

  async updateKm_hours_cost(id_transp_model: number, newKm_hours_cost: UpdateKm_hours_costDto) {
    const km = await this.km_hours_costRepository.preload({
        id_transp_model,
        type_transp_model: newKm_hours_cost.type_transp_model,
        description_tm: newKm_hours_cost.description_tm,
        route_km_cost: newKm_hours_cost.route_km_cost,
        hours_cost: newKm_hours_cost.hours_cost,
        extra_km_cost: newKm_hours_cost.extra_km_cost, 
        extras_hours_cost: newKm_hours_cost.extras_hours_cost
    });

    if (!km) {
        throw new NotFoundException('Resource not found');
    }

    await this.km_hours_costRepository.save(km);
    return km;
  }

  async removeKm_hours_cost(id: number): Promise<string> {
    const km_hours_cost: Km_hours_cost = await this.km_hours_costRepository.findOne({ where: { id_km_hours_cost: id } } as FindOneOptions<Km_hours_cost>);
    let ok: string = 'NO ELIMINADO';

    if (!km_hours_cost) {
        throw new NotFoundException('Resource not found');
    } else {
        ok = 'ELIMINADO';
    }

    await this.km_hours_costRepository.remove(km_hours_cost);
    return ok;
  }
}
