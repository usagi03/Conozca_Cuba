import { Module } from '@nestjs/common';
import { AcommodationsService } from './service/acommodations.service';
import { AcommodationsController } from './controller/acommodations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acommodation } from './acommodations.entity';
import { Hotel } from '../hotels/hotels.entity';
import { Room } from '../rooms/rooms.entity';
import { Season } from '../seasons/seasons.entity';
import { HotelsModule } from '../hotels/hotels.module';
import { RoomsModule } from '../rooms/rooms.module';
import { SeasonsModule } from '../seasons/seasons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Acommodation, Hotel, Room, Season]), HotelsModule, RoomsModule, SeasonsModule],
  controllers: [AcommodationsController],
  providers: [AcommodationsService]
})
export class AcommodationsModule {}
