import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @IsString()
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  luggage_capacity: number;

  @IsNumber()
  @IsNotEmpty()
  with_luggage_capacity: number;

  @IsNumber()
  @IsNotEmpty()
  total_capacity: number;

  @IsNumber()
  year_build: number;
}
