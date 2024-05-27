import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePackageDto {
    @IsString()
    @IsNotEmpty()
    promotional_name: string;

    @IsString()
    @IsNotEmpty()
    days_count: number;

    @IsString()
    @IsNotEmpty()
    nigths_count: number;

    @IsString()
    @IsNotEmpty()
    pax_count: number;

    @IsString()
    @IsNotEmpty()
    hotel_airport_ride_cost: number;

    @IsString()
    @IsNotEmpty()
    percent_profit: number;

    @IsNumber()
    @IsNotEmpty()
    contract: number;
}
