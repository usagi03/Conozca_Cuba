import { IsNotEmpty, IsString } from "class-validator";

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    name_season: string;

    @IsString()
    @IsNotEmpty()
    start_season: string;

    @IsString()
    @IsNotEmpty()
    end_season: string;

    @IsString()
    @IsNotEmpty()
    description_season: string;
}