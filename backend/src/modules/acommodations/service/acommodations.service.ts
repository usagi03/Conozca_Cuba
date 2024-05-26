import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Acommodation } from '../acommodations.entity';
import { Room } from 'src/modules/rooms/rooms.entity';
import { Season } from 'src/modules/seasons/seasons.entity';
import { Hotel } from 'src/modules/hotels/hotels.entity';
import { CreateAcommodationDto } from '../dtos/create-acommodation.dto';
import { UpdateAcommodationDto } from '../dtos/update-acommodation.dto';

@Injectable()
export class AcommodationsService {
    constructor(
        @InjectRepository(Acommodation) 
        private readonly acommodationRepository: Repository<Acommodation>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(Season) 
        private readonly seasonRepository: Repository<Season>,
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>) {}

    async getAcommodations(): Promise<Acommodation[]> {
        return await this.acommodationRepository.find({relations: ['room', 'season', 'hotel']});
    }

    async getAcommodation(id: number): Promise<Acommodation> {
        console.log(id);
        const acommodation = await this.acommodationRepository.findOne({ relations: ['room', 'season', 'hotel'], where: { id_acommodation: id } } as FindOneOptions<Acommodation>);
        console.log(acommodation);

        if (!acommodation) {
            throw new NotFoundException('Resource not found');
        }

        return acommodation;
    }

    async createAcommodation(newAcommodation: CreateAcommodationDto): Promise<Acommodation> {
        const acommodation = this.acommodationRepository.create(newAcommodation);
        acommodation.room = { id_room: newAcommodation.room.id_room } as Room; 
        acommodation.season = { id_season: newAcommodation.season.id_season } as Season; 
        acommodation.hotel = { id_hotel: newAcommodation.hotel.id_hotel } as Hotel; 
        return this.acommodationRepository.save(acommodation);
    }

    async updateAcommodation(id_acommodation: number, newAcommodation: UpdateAcommodationDto) {
        const acommodation = await this.acommodationRepository.preload({
            id_acommodation,
            room: { id_room: newAcommodation.room.id_room },
            season: { id_season: newAcommodation.season.id_season },
            hotel: { id_hotel: newAcommodation.hotel.id_hotel }
        });
    
        if (!acommodation) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.acommodationRepository.save(acommodation);
        return acommodation;
    }

    async removeAcommodation(id: number): Promise<string> {
        const acommodation: Acommodation = await this.acommodationRepository.findOne({ where: { id_acommodation: id } } as FindOneOptions<Acommodation>);
        let ok: string = 'NO ELIMINADO';

        if (!acommodation) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.acommodationRepository.remove(acommodation);
        return ok;
    }   
}
