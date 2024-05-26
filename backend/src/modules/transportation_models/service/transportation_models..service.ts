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

    async createModel(newModel: CreateModelDto): Promise<Transportation_model> {
        const model = this.modelRepository.create(newModel);
        return this.modelRepository.save(model);
    }

    async updateModel(id_transp_model: number, newModel: UpdateModelDto) {
        const model = await this.modelRepository.preload({
            id_transp_model,
            type_transp_model: newModel.type_transp_model,
        description_tm: newModel.description_tm,
        });
    
        if (!model) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.modelRepository.save(model);
        return model;
    }

    async removeModel(id: number): Promise<string> {
        const model: Transportation_model = await this.modelRepository.findOne({ where: { id_transp_model: id } } as FindOneOptions<Transportation_model>);
        let ok: string = 'NO ELIMINADO';

        if (!model) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.modelRepository.remove(model);
        return ok;
    }
}
