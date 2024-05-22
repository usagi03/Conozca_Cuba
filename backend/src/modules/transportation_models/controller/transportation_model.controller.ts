import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { TransportationModelsService } from '../service/transportation_models..service';
import { Transportation_model } from '../model.entity';
import { CreateModelDto } from '../dtos/create-model.dto';
import { UpdateModelDto } from '../dtos/update-model.dto';

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

  @Post()
  createModel(@Body() model: CreateModelDto): Promise<Transportation_model> {
    return this.modelService.createModel(model);
  }

  @Patch(':id_transp_model')
  updateModel(@Param('id_transp_model') id: number, @Body() model: UpdateModelDto): Promise<Transportation_model> {
    return this.modelService.updateModel(id, model);
  }

  @Delete(':id_transp_model')
  deleteModel(@Param('id_transp_model') id: number): Promise<string> {
    return this.modelService.removeModel(id);
  }
}
