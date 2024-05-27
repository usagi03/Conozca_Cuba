import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { AcommodationsService } from '../service/acommodations.service';
import { Acommodation } from '../acommodations.entity';
import { CreateAcommodationDto } from '../dtos/create-acommodation.dto';
import { UpdateAcommodationDto } from '../dtos/update-acommodation.dto';

@Controller('acommodations')
export class AcommodationsController {
  constructor(private readonly acommodationService: AcommodationsService){}

  @Get()
  getAcommodations(): Promise<Acommodation[]> {
    return this.acommodationService.getAcommodations();
  }

  @Get(':id_acommodation')
  getAcommodation(@Param('id_acommodation') id: number): Promise<Acommodation> {
    return this.acommodationService.getAcommodation(id);
  }

  @Post()
  createAcommodation(@Body() acommodation: CreateAcommodationDto): Promise<Acommodation> {
    return this.acommodationService.createAcommodation(acommodation);
  }

  @Patch(':id_acommodation')
  updateAcommodation(@Param('id_acommodation') id: number, @Body() acommodation: UpdateAcommodationDto) {
    return this.acommodationService.updateAcommodation(id, acommodation);
  }

  @Delete(':id_acommodation')
  deleteAcommodation(@Param('id_acommodation') id: number): Promise<string> {
    return this.acommodationService.removeAcommodation(id);
  }
}
