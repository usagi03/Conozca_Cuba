import { Injectable, NotFoundException } from '@nestjs/common';
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
        /*@InjectRepository(Meal_plan)
    private readonly planRepository: Repository<Meal_plan>*/) {}

    async getRooms(): Promise<Room[]> {
        return await this.roomRepository.find({relations: ['meal_plan']});
    }

    async getRoom(id: number): Promise<Room> {
        console.log(id);
        const room = await this.roomRepository.findOne({ relations: ['meal_plan'], where: { id_room: id } } as FindOneOptions<Room>);
        console.log(room);

        if (!room) {
            throw new NotFoundException('Resource not found');
        }

        return room;
    }

    async createRoom(newRoom: CreateRoomDto): Promise<Room> {
        const room = this.roomRepository.create(newRoom);
        room.plan = { id_plan: newRoom.plan.id_plan } as Meal_plan; 
        return this.roomRepository.save(room);
    }

    async updateRoom(id_room: number, newRoom: UpdateRoomDto) {
        const room = await this.roomRepository.preload({
            id_room,
            room_number: newRoom.room_number,
            room_type: newRoom.room_type,
            room_cost: newRoom.room_cost,
            room_surcharge: newRoom.room_surcharge,
            plan: { id_plan: newRoom.plan.id_plan } 
        });
    
        if (!room) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.roomRepository.save(room);
        return room;
    }

    async removeRoom(id: number): Promise<string> {
        const room: Room = await this.roomRepository.findOne({ where: { id_room: id } } as FindOneOptions<Room>);
        let ok: string = 'NO ELIMINADO';

        if (!room) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.roomRepository.remove(room);
        return ok;
    }   
}
