import { IsNumber, IsOptional } from "class-validator";

export class UpdateAcommodationDto {
    @IsNumber()
    @IsOptional()
    room?: number;

    @IsNumber()
    @IsOptional()
    season?: number;

    @IsNumber()
    @IsOptional()
    hotel?: number;
}