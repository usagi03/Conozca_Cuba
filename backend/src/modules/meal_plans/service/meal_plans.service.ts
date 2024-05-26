import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Meal_plan } from '../plans.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dto';

@Injectable()
export class Meal_PlansService {
    constructor(
        @InjectRepository(Meal_plan)
        private readonly planRepository: Repository<Meal_plan>) {}

    async getPlans(): Promise<Meal_plan[]> {
        return await this.planRepository.find();
    }

    async getPlan(id: number): Promise<Meal_plan> {
        console.log(id);
        const plan = await this.planRepository.findOne({ where: { id_plan: id } });
        console.log(plan);

        if (!plan) {
            throw new NotFoundException('Resource not found');
        }

        return plan;
    }

    async createPlan(newPlan: CreatePlanDto): Promise<Meal_plan> {
        return await this.planRepository.save({
            ...newPlan,
        });
    }

    async updatePlan(id_plan: number, newPlan: UpdatePlanDto) {
        let ok = "Meal plan could not be updated"
        const affectedRows = await this.planRepository.update(id_plan, {
            ...newPlan,
         });
     
         if (affectedRows.affected > 0) {
             ok = "Meal plan updated successfully";
         } 
         return ok;
    }

    async removePlan(id: number): Promise<string> {
        let ok = "Meal plan deleted successfully"
        const plan: Meal_plan = await this.planRepository.findOne({ where: { id_plan: id } } as FindOneOptions<Meal_plan>);
    
         if (!plan) {
             ok = "User could not be deleted";
         }
         
         await this.planRepository.remove(plan);
         return ok;
    }
}
