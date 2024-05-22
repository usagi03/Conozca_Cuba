import { IsObject, IsOptional, IsString } from "class-validator";
import { Contract } from "src/modules/contracts/contract.entity";

export class UpdatePackageDto {
    @IsString()
    @IsOptional()
    readonly promotional_name?: string;

    @IsString()
    @IsOptional()
    readonly days_count?: number;

    @IsString()
    @IsOptional()
    readonly nigths_count?: number;

    @IsString()
    @IsOptional()
    readonly pax_count?: number;

    @IsString()
    @IsOptional()
    readonly hotel_airport_ride_cost?: number;

    @IsString()
    @IsOptional()
    readonly percent_profit?: number;

    @IsObject()
    @IsOptional()
    readonly contract?: Partial<Contract>;
}