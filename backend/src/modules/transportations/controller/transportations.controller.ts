import { Body, Controller, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { TransportationsService } from "../service/transportations.service";
import { Transportation } from "../transportation.entity";
import { CreateTransportationDto } from "../dtos/create-transportation.dto";
import { UpdateTransportationDto } from "../dtos/update-transportation.dto";

@Controller("transportations")
export class TransportationsController {
  constructor(private readonly transportationService: TransportationsService) {}

  @Get()
  async getTransportations(): Promise<Transportation[]> {
    return this.transportationService.getTransportations();
  }

  @Get(":id_transportation")
  async getTransportation(@Param("id_transportation") id: number): Promise<Transportation> {
    return this.transportationService.getTransportation(id);
  }

  @Post()
  createTransportation(@Body() transportation: CreateTransportationDto): Promise<Transportation> {
    return this.transportationService.createTransportation(transportation);
  }

  @Patch(':id_transportation')
  updateTransportation(@Param('id_transportation') id: number, @Body() transportation: UpdateTransportationDto): Promise<Transportation> {
    return this.transportationService.updateTransportation(id, transportation);
  }

  @Delete(':id_transportation')
  deleteTransportation(@Param('id_transportation') id: number): Promise<string> {
    return this.transportationService.removeTransportation(id);
  }
}
