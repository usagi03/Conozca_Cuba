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
        return await this.activityRepository.save({
            ...newActivity,
        });
    }

    async updateActivity(id_activity: number, newActivity: UpdateActivityDto) {
        let ok = "Activity could not be updated"
        const affectedRows = await this.activityRepository.update(id_activity, {
            ...newActivity,
        });
     
        if (affectedRows.affected > 0) {
            ok = "Activity updated successfully";
        } 
        return ok;
    }

    async removeActivity(id: number): Promise<string> {
        let ok = "Activity deleted successfully"
        const activity: Daily_activity = await this.activityRepository.findOne({ where: { id_activity: id } } as FindOneOptions<Daily_activity>);
    
        if (!activity) {
            ok = "Activity could not be deleted";
        }
         
        await this.activityRepository.remove(activity);
        return ok;
    }
}
