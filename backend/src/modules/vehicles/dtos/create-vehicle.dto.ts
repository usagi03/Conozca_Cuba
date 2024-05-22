import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  readonly license_plate: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsNumber()
  @IsNotEmpty()
  readonly luggage_capacity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly with_luggage: number;

  @IsNumber()
  @IsNotEmpty()
  readonly total_capacity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly year_built: number;
}
