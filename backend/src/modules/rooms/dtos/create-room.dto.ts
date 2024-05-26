import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    room_number: string;

    @IsString()
    @IsNotEmpty()
    room_type: string;

    @IsNumber()
    @IsNotEmpty()
    room_cost: number;

    @IsNumber()
    @IsNotEmpty()
    room_surcharge: number;

    @IsString()
    @IsNotEmpty()
    plan: string;
}

