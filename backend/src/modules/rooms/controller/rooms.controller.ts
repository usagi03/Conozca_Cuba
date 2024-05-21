import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { RoomsService } from '../service/rooms.service';
import { Room } from '../rooms.entity';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { UpdateRoomDto } from '../dtos/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService){}

  @Get()
  getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Get(':id_room')
  getRoom(@Param('id_room') id: number): Promise<Room> {
    return this.roomService.getRoom(id);
  }

  @Post()
  createRoom(@Body() room: CreateRoomDto): Promise<Room> {
    return this.roomService.createRoom(room);
  }

  @Patch(':id_room')
  updateRoom(@Param('id_room') id: number, @Body() room: UpdateRoomDto): Promise<Room> {
    return this.roomService.updateRoom(id, room);
  }

  @Delete(':id_room')
  deleteRoom(@Param('id_room') id: number): Promise<string> {
    return this.roomService.removeRoom(id);
  }
}
