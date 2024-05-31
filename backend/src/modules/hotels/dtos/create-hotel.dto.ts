import { IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateHotelDto {
    @IsString()
    @IsNotEmpty()
    name_hotel: string;

    @IsString()
    @IsNotEmpty()
    category_hotel: string;

    @IsString()
    @IsNotEmpty()
    address_hotel: string;

    @IsString()
    @IsNotEmpty()
    province_hotel: string;

    @IsString()
    date_hotel: string;

    @IsString()
    phone: string;

    @IsString()
    fax: string;

    @IsString()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    distance_to_city: number;

    @IsNumber()
    @IsNotEmpty()
    distance_to_airport: number;

    @IsNumber()
    floor_count: number;

    @IsString()
    business_model: string;

    @IsString()
    location_hotel: string;

    @IsBoolean()
    is_active: boolean;
}