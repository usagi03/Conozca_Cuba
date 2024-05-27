import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateHotelDto {
    @IsString()
    @IsOptional()
    name_hotel?: string;

    @IsString()
    @IsOptional()
    category_hotel?: string;

    @IsString()
    @IsOptional()
    address_hotel?: string;

    @IsString()
    @IsOptional()
    province_hotel?: string;

    @IsString()
    @IsOptional()
    date_hotel?: string;

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
    distance_to_city?: number;

    @IsNumber()
    @IsOptional()
    distance_to_airport?: number;

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