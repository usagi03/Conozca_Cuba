import { IsDate, IsOptional, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class UpdateSeasonDto {
    @IsString()
    @IsOptional()
    readonly name_season?: string;

    @IsDate()
    @IsOptional()
    readonly start_season?: Timestamp;

    @IsDate()
    @IsOptional()
    readonly end_season?: Timestamp;

    @IsString()
    @IsOptional()
    readonly description_season?: string;
}