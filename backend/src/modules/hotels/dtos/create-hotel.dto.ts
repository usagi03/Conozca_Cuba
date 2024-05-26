import { IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

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
    date_hotel: Date;

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
}