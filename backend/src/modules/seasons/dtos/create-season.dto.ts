import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateSeasonDto {
    @IsString()
    @IsNotEmpty()
    readonly name_season: string;

    @IsDate()
    @IsNotEmpty()
    readonly start_season: Date;

    @IsDate()
    @IsNotEmpty()
    readonly end_season: Date;

    @IsString()
    @IsNotEmpty()
    readonly description_season: string;
}