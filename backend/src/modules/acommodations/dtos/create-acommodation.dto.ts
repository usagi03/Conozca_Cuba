import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAcommodationDto {
    @IsNumber()
    @IsNotEmpty()
    room: number;

    @IsNumber()
    @IsNotEmpty()
    season: number;

    @IsNumber()
    @IsNotEmpty()
    hotel: number;
}