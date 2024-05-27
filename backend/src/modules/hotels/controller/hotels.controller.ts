import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { HotelsService } from '../service/hotels.service';
import { Hotel } from '../hotels.entity';
import { CreateHotelDto } from '../dtos/create-hotel.dto';
import { UpdateHotelDto } from '../dtos/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelService: HotelsService){}

  @Get()
  getHotels(): Promise<Hotel[]> {
    return this.hotelService.getHotels();
  }

  @Get(':id_hotel')
  getHotel(@Param('id_hotel') id: number): Promise<Hotel> {
    return this.hotelService.getHotel(id);
  }

  @Post()
  createHotel(@Body() hotel: CreateHotelDto): Promise<Hotel> {
    return this.hotelService.createHotel(hotel);
  }

  @Patch(':id_hotel')
  updateHotel(@Param('id_hotel') id: number, @Body() hotel: UpdateHotelDto) {
    return this.hotelService.updateHotel(id, hotel);
  }

  @Delete(':id_hotel')
  deleteHotel(@Param('id_hotel') id: number): Promise<string> {
    return this.hotelService.removeHotel(id);
  }
}
