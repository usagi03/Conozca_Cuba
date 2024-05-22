import { IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import { Double, Timestamp } from "typeorm";

export class CreateHotelDto {
    @IsString()
    @IsNotEmpty()
    readonly name_hotel: string;

    @IsString()
    @IsNotEmpty()
    readonly category_hotel: string;

    @IsString()
    @IsNotEmpty()
    address_hotel: string;

    @IsString()
    @IsNotEmpty()
    province_hotel: string;

    @IsDate()
    @IsNotEmpty()
    date_hotel: Timestamp;

    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    fax: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    distance_to_city: Double;

    @IsNumber()
    @IsNotEmpty()
    distance_to_airport: Double;

    @IsNumber()
    @IsNotEmpty()
    floor_count: number;

    @IsString()
    @IsNotEmpty()
    business_model: string;

    @IsString()
    @IsNotEmpty()
    location_hotel: string;
}