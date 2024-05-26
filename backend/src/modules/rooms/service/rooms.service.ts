import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../rooms.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Meal_plan } from 'src/modules/meal_plans/plans.entity';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { UpdateRoomDto } from '../dtos/update-room.dto';

@Injectable()
export class RoomsService {
    
    constructor(
        @InjectRepository(Room) 
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(Meal_plan)
        private readonly planRepository: Repository<Meal_plan>) {}

    async getRooms(): Promise<Room[]> {
        return await this.roomRepository.find({relations: ['plan']});
    }

    async getRoom(id: number): Promise<Room> {
        console.log(id);
        const room = await this.roomRepository.findOne({ relations: ['plan'], where: { id_room: id } } as FindOneOptions<Room>);
        console.log(room);

        if (!room) {
            throw new NotFoundException('Resource not found');
        }

        return room;
    }

    async createRoom(newRoom: CreateRoomDto): Promise<Room> {
        const plan = await this.validatePlan(newRoom.plan);
        return await this.roomRepository.save({
            ...newRoom,
            plan: plan,
        });
    }

    async updateRoom(id_room: number, newRoom: UpdateRoomDto) {
        let ok = "Room could not be updated"
        const affectedRows = await this.roomRepository.update(id_room, {
            ...newRoom,
            plan: newRoom.plan? await this.validatePlan(newRoom.plan) : undefined,
         });
     
         if (affectedRows.affected > 0) {
             ok = "Room updated successfully";
         } 
         return ok;
    }

    async removeRoom(id: number): Promise<string> {
        let ok = "Room deleted successfully"
        const room: Room = await this.roomRepository.findOne({ where: { id_room: id } } as FindOneOptions<Room>);
    
         if (!room) {
             ok = "Room could not be deleted";
         }
         
         await this.roomRepository.remove(room);
         return ok;
    }   

    private async validatePlan(plan: string) {
        const planEntity = await this.planRepository.findOneBy({ plan_type: plan });
      
        if (!planEntity) {
          throw new BadRequestException('Meal plan not found');
        }
      
        return planEntity;
      }
}
