import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateVehicleDto {
  @IsNumber()
  @IsOptional()
  id_vehicle?: number;

  @IsString()
  @IsOptional()
  license_plate?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @IsOptional()
  luggage_capacity?: number;

  @IsNumber()
  @IsOptional()
  with_luggage_capacity?: number;

  @IsNumber()
  @IsOptional()
  total_capacity?: number;

  @IsNumber()
  @IsOptional()
  year_build?: number;
}
