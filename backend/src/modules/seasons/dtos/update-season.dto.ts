import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateSeasonDto {
    @IsString()
    @IsOptional()
    readonly name_season?: string;

    @IsDate()
    @IsOptional()
    readonly start_season?: Date;

    @IsDate()
    @IsOptional()
    readonly end_season?: Date;

    @IsString()
    @IsOptional()
    readonly description_season?: string;
}