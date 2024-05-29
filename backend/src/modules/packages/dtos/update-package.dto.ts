import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePackageDto {
    @IsString()
    @IsOptional()
    promotional_name?: string;

    @IsNumber()
    @IsOptional()
    days_count?: number;

    @IsNumber()
    @IsOptional()
    nights_count?: number;

    @IsNumber()
    @IsOptional()
    pax_count?: number;

    @IsNumber()
    @IsOptional()
    hotel_airport_ride_cost?: number;

    @IsNumber()
    @IsOptional()
    percent_profit?: number;

    @IsNumber()
    @IsOptional()
    contract?: number;
}