import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateVehicleDto {
  @IsNumber()
  @IsOptional()
  readonly id_vehicle?: number;

  @IsString()
  @IsOptional()
  readonly license_plate?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsNumber()
  @IsOptional()
  readonly luggage_capacity?: number;

  @IsNumber()
  @IsOptional()
  readonly with_luggage?: number;

  @IsNumber()
  @IsOptional()
  readonly total_capacity?: number;

  @IsNumber()
  @IsOptional()
  readonly year_built?: number;
}
