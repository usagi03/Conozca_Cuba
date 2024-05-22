import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Contract } from "src/modules/contracts/contract.entity";

export class CreatePackageDto {
    @IsString()
    @IsNotEmpty()
    readonly promotional_name: string;

    @IsString()
    @IsNotEmpty()
    readonly days_count: number;

    @IsString()
    @IsNotEmpty()
    readonly nigths_count: number;

    @IsString()
    @IsNotEmpty()
    readonly pax_count: number;

    @IsString()
    @IsNotEmpty()
    readonly hotel_airport_ride_cost: number;

    @IsString()
    @IsNotEmpty()
    readonly percent_profit: number;

    @IsObject()
    @IsNotEmpty()
    readonly contract: Partial<Contract>;
}
