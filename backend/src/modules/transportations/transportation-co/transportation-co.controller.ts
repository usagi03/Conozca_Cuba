import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from "@nestjs/common";
import { TransportationSService } from "../transportation-s/transportation-s.service";
import { Transportation } from "../transportation.entity";
import { create_TransportationDto, update_TransportationDto } from "../Dto";

@Controller("transportation-co")
export class TransportationCoController {
  constructor(private readonly TransportationService: TransportationSService) {}

  @Get()
  async getTS(): Promise<Transportation[]> {
    return this.TransportationService.getTrans();
  }

  @Get()
  async getT(@Param("id") id: number): Promise<Transportation> {
    return this.TransportationService.getT(id);
  }

  @Post(":id")
  async createT(
    @Body() transportation: create_TransportationDto
  ): Promise<Transportation> {
    return this.TransportationService.createT(transportation);
  }

  @Patch()
  async updateT(
    @Param("id") id: number,
    @Body() transportation: update_TransportationDto
  ): Promise<Transportation> {
    return this.TransportationService.updateT(id, transportation);
  }

  @Delete()
  async removeT(@Param("id") id: number): Promise<void> {
    return this.TransportationService.removeT(id);
  }
}
