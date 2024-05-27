import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePackageDto {
    @IsString()
    @IsOptional()
    promotional_name?: string;

    @IsString()
    @IsOptional()
    days_count?: number;

    @IsString()
    @IsOptional()
    nigths_count?: number;

    @IsString()
    @IsOptional()
    pax_count?: number;

    @IsString()
    @IsOptional()
    hotel_airport_ride_cost?: number;

    @IsString()
    @IsOptional()
    percent_profit?: number;

    @IsNumber()
    @IsOptional()
    contract?: number;
}