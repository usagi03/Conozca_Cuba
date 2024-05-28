import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Transportation_model } from '../model.entity';
import { CreateModelDto } from '../dtos/create-model.dto';
import { UpdateModelDto } from '../dtos/update-model.dto';

@Injectable()
export class TransportationModelsService {
    constructor(
        @InjectRepository(Transportation_model)
        private readonly modelRepository: Repository<Transportation_model>) {}

    async getModels(): Promise<Transportation_model[]> {
        return await this.modelRepository.find();
    }

    async getModel(id: number): Promise<Transportation_model> {
        console.log(id);
        const model = await this.modelRepository.findOne({ where: { id_transp_model: id } });
        console.log(model);

        if (!model) {
            throw new NotFoundException('Resource not found');
        }

        return model;
    }

    async createModel(type: string, descrip: string): Promise<Transportation_model> {
        const newModel = new CreateModelDto();
        newModel.type_transp_model = type;
        newModel.description_tm = descrip;
        return await this.modelRepository.save({
            ...newModel
        });
    }

    async updateModel(id_transp_model: number, descrip: string) {
        let ok = "Transportation model could not be updated"
        const newModel = new UpdateModelDto();
        newModel.description_tm = descrip;
        const affectedRows = await this.modelRepository.update(id_transp_model, {
            ...newModel,
        });
     
        if (affectedRows.affected > 0) {
            ok = "Transportation model updated successfully";
        } 
        return ok;
    }

    async removeModel(id: number): Promise<string> {
        let ok = "Transportation model deleted successfully"
        const model: Transportation_model = await this.modelRepository.findOne({ where: { id_transp_model: id } } as FindOneOptions<Transportation_model>);
    
        if (!model) {
            ok = "Transportation model could not be deleted";
        }
         
        await this.modelRepository.remove(model);
        return ok;
    }
}
