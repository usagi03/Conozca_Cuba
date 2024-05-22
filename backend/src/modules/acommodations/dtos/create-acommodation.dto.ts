import { IsNotEmpty, IsObject } from "class-validator";
import { Hotel } from "src/modules/hotels/hotels.entity";
import { Room } from "src/modules/rooms/rooms.entity";
import { Season } from "src/modules/seasons/seasons.entity";

export class CreateAcommodationDto {
    @IsObject()
    @IsNotEmpty()
    readonly room: Partial<Room>;

    @IsObject()
    @IsNotEmpty()
    readonly season: Partial<Season>;

    @IsObject()
    @IsNotEmpty()
    readonly hotel: Partial<Hotel>;
}