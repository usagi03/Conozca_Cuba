import { Injectable, NotFoundException } from "@nestjs/common";
import { Km_cost } from "../km_cost.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateKm_costDto, UpdateKm_costDto } from "../dtos";

@Injectable()
export class Km_costsService {
  constructor(
    @InjectRepository(Km_cost)
    private readonly km_costRepository: Repository<Km_cost>) {}
  
  async getKm_costs(): Promise< Km_cost[]> {
    return await this.km_costRepository.find();
  }
  
  async getKm_cost(id: number): Promise<Km_cost> {
      console.log(id);
      const km_cost = await this.km_costRepository.findOne({ where: { id_transp_model: id } });
      console.log(km_cost);
  
      if (!km_cost) {
          throw new NotFoundException('Resource not found');
      }
  
      return km_cost;
  }
  
  async createKm_cost(newKm_cost: CreateKm_costDto): Promise<Km_cost> {
      const km_cost = this.km_costRepository.create(newKm_cost);
      return this.km_costRepository.save(km_cost);
  }
  
  async updateKm_cost(id_transp_model: number, newKm_cost: UpdateKm_costDto) {
      const km = await this.km_costRepository.preload({
          id_transp_model,
          type_transp_model: newKm_cost.type_transp_model,
          description_tm: newKm_cost.description_tm,
          description: newKm_cost.description,
          km_cost: newKm_cost.km_cost,
          full_ride_cost: newKm_cost.full_ride_cost,
          waited_hours_cost: newKm_cost.waited_hours_cost
      });
  
      if (!km) {
          throw new NotFoundException('Resource not found');
      }
  
      await this.km_costRepository.save(km);
      return km;
  }
  
  async removeKm_cost(id: number): Promise<string> {
      const km_cost: Km_cost = await this.km_costRepository.findOne({ where: { id_km_cost: id } } as FindOneOptions<Km_cost>);
      let ok: string = 'NO ELIMINADO';
  
      if (!km_cost) {
          throw new NotFoundException('Resource not found');
      } else {
          ok = 'ELIMINADO';
      }
  
      await this.km_costRepository.remove(km_cost);
      return ok;
  }
}
