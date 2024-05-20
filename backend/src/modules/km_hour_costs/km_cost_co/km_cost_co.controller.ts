import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { KmCostSService } from "../km_cost_s/km_cost_s.service";
import { KmHoursCost } from "../km_hours_cost.entity";
import { UpdateKmHoursCost } from "../dto/update.Dto";
import { CreateKmHoursCost } from "../dto/create.Dto";

@Controller("km-cost-co")
export class KmCostCoController {
  constructor(private readonly service: KmCostSService) {}

  @Get()
  async getAll(): Promise<KmHoursCost[]> {
    return this.service.getAll();
  }

  @Get(":id")
  async get(@Param("id") id: number): Promise<KmHoursCost> {
    return this.service.getRoute(id);
  }

  @Post()
  async create(@Body() route: CreateKmHoursCost): Promise<KmHoursCost> {
    return this.service.createKmHoursCost(route);
  }
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() route: UpdateKmHoursCost
  ): Promise<KmHoursCost> {
    return this.service.updateKmHoursCost(id, route);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.service.remove(id);
  }
}
