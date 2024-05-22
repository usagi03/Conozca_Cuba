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
        const season = this.seasonRepository.create(newSeason);
        return this.seasonRepository.save(season);
    }

    async updateSeason(id_season: number, newSeason: UpdateSeasonDto) {
        const season = await this.seasonRepository.preload({
            id_season,
            name_season: newSeason.name_season,
            start_season: newSeason.start_season,
            end_season: newSeason.end_season,
            description_season: newSeason.description_season,
        });
    
        if (!season) {
            throw new NotFoundException('Resource not found');
        }
    
        await this.seasonRepository.save(season);
        return season;
    }

    async removeSeason(id: number): Promise<string> {
        const season: Season = await this.seasonRepository.findOne({ where: { id_season: id } } as FindOneOptions<Season>);
        let ok: string = 'NO ELIMINADO';

        if (!season) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.seasonRepository.remove(season);
        return ok;
    }
}
