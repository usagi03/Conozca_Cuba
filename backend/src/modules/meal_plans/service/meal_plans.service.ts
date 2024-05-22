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
        const plan = this.planRepository.create(newPlan);
        return this.planRepository.save(plan);
    }

    async updatePlan(id_plan: number, newPlan: UpdatePlanDto) {
        const plan = await this.planRepository.preload({
            id_plan,
            plan_type: newPlan.plan_type,
            plan_cost: newPlan.plan_cost
        });
    
        if (!plan) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.planRepository.save(plan);
        return plan;
    }

    async removePlan(id: number): Promise<string> {
        const plan: Meal_plan = await this.planRepository.findOne({ where: { id_plan: id } } as FindOneOptions<Meal_plan>);
        let ok: string = 'NO ELIMINADO';

        if (!plan) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.planRepository.remove(plan);
        return ok;
    }
}
