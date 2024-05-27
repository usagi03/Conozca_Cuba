import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Km_hours_cost } from "../km_hours_cost.entity";
import { CreateKm_hours_costDto, UpdateKm_hours_costDto } from "../dtos";
import { TransportationModelsService } from "src/modules/transportation_models/service/transportation_models..service";
import { CreateModelDto, UpdateModelDto } from "src/modules/transportation_models/dtos";

@Injectable()
export class Km_hours_costsService {
  constructor(
    private readonly modelService: TransportationModelsService,

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
  
  async createKm_hours_cost(newModel: CreateModelDto, newKm_hours_cost: CreateKm_hours_costDto): Promise<Km_hours_cost> {
    const model = this.modelService.createModel(newModel);
    const km = new Km_hours_cost;
    km.id_transp_model = (await model).id_transp_model;
    km.route_km_cost = newKm_hours_cost.route_km_cost;
    km.hours_cost = newKm_hours_cost.hours_cost;
    km.extra_km_cost = newKm_hours_cost.extra_km_cost;
    km.extras_hours_cost = newKm_hours_cost.extras_hours_cost;
    const km_hours_cost = this.km_hours_costRepository.create(km);
    return this.km_hours_costRepository.save(km_hours_cost);
  }

  async updateKm_hours_cost(id_transp_model: number, newModel: UpdateModelDto, newKm_hours_cost: UpdateKm_hours_costDto) {
    let ok = "Km and hours cost could not be updated"

    await this.modelService.updateModel(id_transp_model, newModel);
    const affectedRows = await this.km_hours_costRepository.update(id_transp_model, {
      ...newKm_hours_cost,
    });
     
    if (affectedRows.affected > 0) {
        ok = "Km and hours cost updated successfully";
    } 
    return ok;
  }

  async removeKm_hours_cost(id: number): Promise<string> {
    let ok = "Km and hours cost deleted successfully"
    const km: Km_hours_cost = await this.km_hours_costRepository.findOne({ where: { id_transp_model: id } } as FindOneOptions<Km_hours_cost>);
    
    if (!km) {
        ok = "Km and hours cost could not be deleted";
    }
         
    await this.km_hours_costRepository.remove(km);
    return ok;
  }
}
