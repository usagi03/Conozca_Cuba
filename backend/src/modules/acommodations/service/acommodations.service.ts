import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async createAcommodation(newAcommodation: CreateAcommodationDto) {
        const room = await this.validateRoom(newAcommodation.room);
        console.log(room)
        const season = await this.validateSeason(newAcommodation.season);
        console.log(season)
        const hotel = await this.validateHotel(newAcommodation.hotel);
        console.log(hotel)
        return await this.acommodationRepository.save({
            ...newAcommodation,
            room: room,
            season: season,
            hotel: hotel,
        });
    }

    async updateAcommodation(id_acommodation: number, newAcommodation: UpdateAcommodationDto) {
        let ok = "Acommodation could not be updated"
        const affectedRows = await this.acommodationRepository.update(id_acommodation, {
            ...newAcommodation,
             room: newAcommodation.room? await this.validateRoom(newAcommodation.room) : undefined,
             hotel: newAcommodation.hotel? await this.validateHotel(newAcommodation.hotel) : undefined,
             season: newAcommodation.season? await this.validateSeason(newAcommodation.season) : undefined,
         });
     
         if (affectedRows.affected > 0) {
             ok = "Acommodation updated successfully";
         } 
         return ok;
    }

    async removeAcommodation(id: number): Promise<string> {
        let ok = "Acommodation deleted successfully"
        const acommodation: Acommodation = await this.acommodationRepository.findOne({ where: { id_acommodation: id } } as FindOneOptions<Acommodation>);
    
         if (!acommodation) {
             ok = "Acommodation could not be deleted";
         }
         
         await this.acommodationRepository.remove(acommodation);
         return ok;
    }   

    private async validateRoom(room: number) {
        const roomEntity = await this.roomRepository.findOneBy({ id_room: room });
      
        if (!roomEntity) {
          throw new BadRequestException('Room not found');
        }
      
        return roomEntity;
    }

    private async validateHotel(hotel: number) {
        const hotelEntity = await this.hotelRepository.findOneBy({ id_hotel: hotel });
      
        if (!hotelEntity) {
          throw new BadRequestException('Hotel not found');
        }
      
        return hotelEntity;
    }

    private async validateSeason(season: number) {
        const seasonEntity = await this.seasonRepository.findOneBy({ id_season: season });
      
        if (!seasonEntity) {
          throw new BadRequestException('Season not found');
        }
      
        return seasonEntity;
    }
}
