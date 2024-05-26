import { IsNotEmpty, IsObject } from "class-validator";
import { Hotel } from "src/modules/hotels/hotels.entity";
import { Room } from "src/modules/rooms/rooms.entity";
import { Season } from "src/modules/seasons/seasons.entity";

export class CreateAcommodationDto {
    @IsObject()
    @IsNotEmpty()
    room: Partial<Room>;

    @IsObject()
    @IsNotEmpty()
    season: Partial<Season>;

    @IsObject()
    @IsNotEmpty()
    hotel: Partial<Hotel>;
}