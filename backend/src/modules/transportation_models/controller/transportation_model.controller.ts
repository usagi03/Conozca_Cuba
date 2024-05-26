import { Controller, Get, Param } from '@nestjs/common';
import { TransportationModelsService } from '../service/transportation_models..service';
import { Transportation_model } from '../model.entity';

@Controller('transportation-model')
export class TransportationModelController {
  constructor(private readonly modelService: TransportationModelsService){}

  @Get()
  getModels(): Promise<Transportation_model[]> {
    return this.modelService.getModels();
  }

  @Get(':id_transp_model')
  getModel(@Param('id_transp_model') id: number): Promise<Transportation_model> {
    return this.modelService.getModel(id);
  }
}
