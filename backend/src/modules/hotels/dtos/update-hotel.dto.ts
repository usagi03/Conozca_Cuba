import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Double, Timestamp } from "typeorm";

export class UpdateHotelDto {
    @IsString()
    @IsOptional()
    readonly name_hotel?: string;

    @IsString()
    @IsOptional()
    readonly category_hotel?: string;

    @IsString()
    @IsOptional()
    address_hotel?: string;

    @IsString()
    @IsOptional()
    province_hotel?: string;

    @IsDate()
    @IsOptional()
    date_hotel?: Timestamp;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    fax?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsNumber()
    @IsOptional()
    distance_to_city?: Double;

    @IsNumber()
    @IsOptional()
    distance_to_airport?: Double;

    @IsNumber()
    @IsOptional()
    floor_count?: number;

    @IsString()
    @IsOptional()
    business_model?: string;

    @IsString()
    @IsOptional()
    location_hotel?: string;
}