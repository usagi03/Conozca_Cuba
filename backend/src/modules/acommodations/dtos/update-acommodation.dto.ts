import { IsObject, IsOptional } from "class-validator";
import { Hotel } from "src/modules/hotels/hotels.entity";
import { Room } from "src/modules/rooms/rooms.entity";
import { Season } from "src/modules/seasons/seasons.entity";

export class UpdateAcommodationDto {
    @IsObject()
    @IsOptional()
    readonly room?: Partial<Room>;

    @IsObject()
    @IsOptional()
    readonly season?: Partial<Season>;

    @IsObject()
    @IsOptional()
    readonly hotel?: Partial<Hotel>;
}