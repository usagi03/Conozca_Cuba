import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { ActivitiesService } from '../service/activities.service';
import { Daily_activity } from '../activities.entity';
import { CreateActivityDto } from '../dtos/create-activity.dto';
import { UpdateActivityDto } from '../dtos/update-activity.dto';

@Controller('activities.')
export class ActivitiesController {
  constructor(private readonly activityService: ActivitiesService){}

  @Get()
  getActivities(): Promise<Daily_activity[]> {
    return this.activityService.getActivities();
  }

  @Get(':id_activity')
  getActivity(@Param('id_activity') id: number): Promise<Daily_activity> {
    return this.activityService.getActivity(id);
  }

  @Post()
  createActivity(@Body() activity: CreateActivityDto): Promise<Daily_activity> {
    return this.activityService.createActivity(activity);
  }

  @Patch(':id_activity')
  updateActivity(@Param('id_activity') id: number, @Body() activity: UpdateActivityDto): Promise<Daily_activity> {
    return this.activityService.updateActivity(id, activity);
  }

  @Delete(':id_activity')
  deleteActivity(@Param('id_activity') id: number): Promise<string> {
    return this.activityService.removeActivity(id);
  }
}
