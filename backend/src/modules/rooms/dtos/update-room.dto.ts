import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRoomDto {
    @IsString()
    @IsOptional()
    room_number?: string;

    @IsOptional()
    @IsNotEmpty()
    room_type?: string;

    @IsOptional()
    @IsNotEmpty()
    room_cost?: number;

    @IsOptional()
    @IsNotEmpty()
    room_surcharge?: number;
    
    @IsString()
    @IsOptional()
    plan?: string;
}