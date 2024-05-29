import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePackageDto {
    @IsString()
    @IsNotEmpty()
    promotional_name: string;

    @IsNumber()
    @IsNotEmpty()
    days_count: number;

    @IsNumber()
    @IsNotEmpty()
    nights_count: number;

    @IsNumber()
    @IsNotEmpty()
    pax_count: number;

    @IsNumber()
    @IsNotEmpty()
    hotel_airport_ride_cost: number;

    @IsNumber()
    @IsNotEmpty()
    percent_profit: number;

    @IsNumber()
    @IsNotEmpty()
    contract: number;
}
