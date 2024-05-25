import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

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
    date_hotel?: Date;

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