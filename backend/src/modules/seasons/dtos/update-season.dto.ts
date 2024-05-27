import { IsOptional, IsString } from "class-validator";

export class UpdateSeasonDto {
    @IsString()
    @IsOptional()
    name_season?: string;

    @IsString()
    @IsOptional()
    start_season?: string;

    @IsString()
    @IsOptional()
    end_season?: string;

    @IsString()
    @IsOptional()
    description_season?: string;
}