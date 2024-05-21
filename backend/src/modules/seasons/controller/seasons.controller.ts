import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { SeasonsService } from '../service/seasons.service';
import { Season } from '../seasons.entity';
import { CreateSeasonDto } from '../dtos/create-season.dto';
import { UpdateSeasonDto } from '../dtos/update-season.dto';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonService: SeasonsService){}

  @Get()
  getSeasons(): Promise<Season[]> {
    return this.seasonService.getSeasons();
  }

  @Get(':id_season')
  getSeason(@Param('id_season') id: number): Promise<Season> {
    return this.seasonService.getSeason(id);
  }

  @Post()
  createSeason(@Body() season: CreateSeasonDto): Promise<Season> {
    return this.seasonService.createSeason(season);
  }

  @Patch(':id_season')
  updateSeason(@Param('id_season') id: number, @Body() season: UpdateSeasonDto): Promise<Season> {
    return this.seasonService.updateSeason(id, season);
  }

  @Delete(':id_season')
  deleteSeason(@Param('id_season') id: number): Promise<string> {
    return this.seasonService.removeSeason(id);
  }
}
