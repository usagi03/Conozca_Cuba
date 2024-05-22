import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    readonly name_season: string;

    @IsDate()
    @IsNotEmpty()
    readonly start_season: Timestamp;

    @IsDate()
    @IsNotEmpty()
    readonly end_season: Timestamp;

    @IsString()
    @IsNotEmpty()
    readonly description_season: string;
}