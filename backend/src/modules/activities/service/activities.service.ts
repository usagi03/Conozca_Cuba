import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Daily_activity } from '../activities.entity';
import { CreateActivityDto } from '../dtos/create-activity.dto';
import { UpdateActivityDto } from '../dtos/update-activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Daily_activity)
        private readonly activityRepository: Repository<Daily_activity>) {}

    async getActivities(): Promise<Daily_activity[]> {
        return await this.activityRepository.find();
    }

    async getActivity(id: number): Promise<Daily_activity> {
        console.log(id);
        const activity = await this.activityRepository.findOne({ where: { id_activity: id } });
        console.log(activity);

        if (!activity) {
            throw new NotFoundException('Resource not found');
        }

        return activity;
    }

    async createActivity(newActivity: CreateActivityDto): Promise<Daily_activity> {
        const activity = this.activityRepository.create(newActivity);
        return this.activityRepository.save(activity);
    }

    async updateActivity(id_activity: number, newActivity: UpdateActivityDto) {
        const activity = await this.activityRepository.preload({
            id_activity,
            type_activity: newActivity.type_activity,
            day_activity: newActivity.day_activity,
            time_activity: newActivity.time_activity,
            cost_activity: newActivity.cost_activity,
            province_activity: newActivity.province_activity,
            description_activity: newActivity.description_activity,
            surcharge_activity: newActivity.surcharge_activity
        });
    
        if (!activity) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.activityRepository.save(activity);
        return activity;
    }

    async removeActivity(id: number): Promise<string> {
        const activity: Daily_activity = await this.activityRepository.findOne({ where: { id_activity: id } } as FindOneOptions<Daily_activity>);
        let ok: string = 'NO ELIMINADO';

        if (!activity) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.activityRepository.remove(activity);
        return ok;
    }
}
