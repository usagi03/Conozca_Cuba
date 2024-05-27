import { Injectable, NotFoundException } from "@nestjs/common";
import { Km_cost } from "../km_cost.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateKm_costDto, UpdateKm_costDto } from "../dtos";
import { TransportationModelsService } from "src/modules/transportation_models/service/transportation_models..service";
import { CreateModelDto, UpdateModelDto } from "src/modules/transportation_models/dtos";

@Injectable()
export class Km_costsService {
  constructor(
    private readonly modelService: TransportationModelsService,

    @InjectRepository(Km_cost)
    private readonly km_costRepository: Repository<Km_cost>) {}
  
  async getKm_costs(): Promise<Km_cost[]> {
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
  
  async createKm_cost(newModel: CreateModelDto, newKm_cost: CreateKm_costDto): Promise<Km_cost> {
    const model = this.modelService.createModel(newModel);
    const km = new Km_cost;
    km.id_transp_model = (await model).id_transp_model;
    km.km_cost = newKm_cost.km_cost;
    km.full_ride_cost = newKm_cost.full_ride_cost;
    km.waited_hours_cost = newKm_cost.waited_hours_cost
    const km_cost = this.km_costRepository.create(km);
    return this.km_costRepository.save(km_cost);
  }
  
  async updateKm_cost(id_transp_model: number, newModel: UpdateModelDto, newKm_cost: UpdateKm_costDto) {
    let ok = "Km cost could not be updated"
    
    await this.modelService.updateModel(id_transp_model, newModel);
    const affectedRows = await this.km_costRepository.update(id_transp_model, {
      ...newKm_cost,
    });
     
    if (affectedRows.affected > 0) {
        ok = "Km cost updated successfully";
    } 
    return ok;
  }
  
  async removeKm_cost(id: number): Promise<string> {
    let ok = "Km cost deleted successfully"
    const km: Km_cost = await this.km_costRepository.findOne({ where: { id_transp_model: id } } as FindOneOptions<Km_cost>);
    
    if (!km) {
        ok = "Km cost could not be deleted";
    }
         
    await this.km_costRepository.remove(km);
    return ok;
  }
}
