import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Km_costsService } from "../service/km_costs.service";
import { Km_cost } from "../km_cost.entity";
import { CreateKm_costDto, UpdateKm_costDto } from "../dtos";
import { CreateModelDto, UpdateModelDto } from "src/modules/transportation_models/dtos";

@Controller("km_costs")
export class Km_costsController {
  constructor(private readonly km_costService: Km_costsService) {}

  @Get()
  async getKm_costs(): Promise<Km_cost[]> {
    return this.km_costService.getKm_costs();
  }

  @Get(":id_km_cost")
  async get(@Param("id_km_cost") id: number): Promise<Km_cost> {
    return this.km_costService.getKm_cost(id);
  }

  @Post()
  async createKm(@Body() model: CreateModelDto, km_cost: CreateKm_costDto): Promise<Km_cost> {
    return this.km_costService.createKm_cost(model, km_cost);
  }

  @Patch(":id_km_cost")
  updateKm_cost(@Param('id_km_cost') id: number, @Body() model:UpdateModelDto, km_cost: UpdateKm_costDto) {
    return this.km_costService.updateKm_cost(id, model, km_cost);
  }

  @Delete(":id_km_cost")
  async removeKm_cost(@Param("id_km_cost") id: number): Promise<string> {
    return this.km_costService.removeKm_cost(id);
  }
}
