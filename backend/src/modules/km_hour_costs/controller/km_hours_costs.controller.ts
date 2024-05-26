import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Km_hours_costsService } from "../service/km_hours_costs.service";
import { Km_hours_cost } from "../km_hours_cost.entity";
import { CreateKm_hours_costDto, UpdateKm_hours_costDto } from "../dtos";

@Controller("km_hours_costs")
export class Km_hours_costsController {
  constructor(private readonly km_hours_costService: Km_hours_costsService) {}

  @Get()
  async getKm_hours_costs(): Promise<Km_hours_cost[]> {
    return this.km_hours_costService.getKm_hours_costs();
  }

  @Get(":id_km_hours_cost")
  async get(@Param("id_km_hours_cost") id: number): Promise<Km_hours_cost> {
    return this.km_hours_costService.getKm_hours_cost(id);
  }

  @Post()
  async create(@Body() km_hours_cost: CreateKm_hours_costDto): Promise<Km_hours_cost> {
    return this.km_hours_costService.createKm_hours_cost(km_hours_cost);
  }
  
  @Patch(":id_km_hours_cost")
  updateKm_hours_cost(@Param('id_km_hours_cost') id: number, @Body() km_hours_cost: UpdateKm_hours_costDto): Promise<Km_hours_cost> {
    return this.km_hours_costService.updateKm_hours_cost(id, km_hours_cost);
  }

  @Delete(":id_km_hours_cost")
  async removeKm_hours_cost(@Param("id_km_hours_cost") id: number): Promise<string> {
    return this.km_hours_costService.removeKm_hours_cost(id);
  }
}
