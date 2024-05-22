import { IsNumber, IsOptional, IsString, IsTimeZone } from "class-validator";

export class UpdateActivityDto {
    @IsString()
    @IsOptional()
    type_activity: string;

    @IsNumber()
    @IsOptional()
    day_activity: number;

    @IsTimeZone()
    @IsOptional()
    time_activity: Time;

    @IsNumber()
    @IsOptional()
    cost_activity: number;

    @IsString()
    @IsOptional()
    province_activity: string;

    @IsString()
    @IsOptional()
    description_activity: string;

    @IsNumber()
    @IsOptional()
    surcharge_activity: number;
}