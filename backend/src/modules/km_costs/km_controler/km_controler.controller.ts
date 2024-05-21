import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { KmServiceService } from "../km_service/km_service.service";
import { Km_cost } from "../km.entity";

@Controller("km-controler")
export class KmControlerController {
  constructor(private readonly kmService: KmServiceService) {}

  @Get()
  async getAll(): Promise<Km_cost[]> {
    return this.kmService.getKms();
  }

  @Get(":id")
  async get(@Param("id") id: number): Promise<Km_cost> {
    return this.kmService.getKm(id);
  }

  @Post()
  async createKm(@Body() km_cost: Km_cost): Promise<Km_cost> {
    return this.kmService.createKm(km_cost);
  }

  @Patch()
  async updateKm(
    @Param("id") id: number,
    @Body() km_cost: Km_cost
  ): Promise<Km_cost> {
    return this.kmService.updateKm(id, km_cost);
  }

  @Delete(":id")
  async removeKm(@Param("id") id: number): Promise<void> {
    return this.kmService.deleteKm(id);
  }
}
