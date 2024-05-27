import { Injectable, NotFoundException } from '@nestjs/common';
import { Season } from '../seasons.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateSeasonDto } from '../dtos/create-season.dto';
import { UpdateSeasonDto } from '../dtos/update-season.dto';

@Injectable()
export class SeasonsService {
    constructor(
        @InjectRepository(Season)
        private readonly seasonRepository: Repository<Season>) {}

    async getSeasons(): Promise<Season[]> {
        return await this.seasonRepository.find();
    }

    async getSeason(id: number): Promise<Season> {
        console.log(id);
        const season = await this.seasonRepository.findOne({ where: { id_season: id } });
        console.log(season);

        if (!season) {
            throw new NotFoundException('Resource not found');
        }

        return season;
    }

    async createSeason(newSeason: CreateSeasonDto): Promise<Season> {
        return await this.seasonRepository.save({
            ...newSeason,
        });
    }

    async updateSeason(id_season: number, newSeason: UpdateSeasonDto) {
        let ok = "Season could not be updated"
        const affectedRows = await this.seasonRepository.update(id_season, {
            ...newSeason,
        });
     
        if (affectedRows.affected > 0) {
            ok = "Season updated successfully";
        } 
        return ok;
    }

    async removeSeason(id: number): Promise<string> {
        let ok = "Season deleted successfully"
        const season: Season = await this.seasonRepository.findOne({ where: { id_season: id } } as FindOneOptions<Season>);
    
    if (!season) {
        ok = "Season could not be deleted";
    }
         
    await this.seasonRepository.remove(season);
    return ok;
    }
}
