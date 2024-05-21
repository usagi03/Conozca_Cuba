import { IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  readonly license_plate: string;

  @IsString()
  readonly brand: string;

  @IsNumber()
  readonly luggage_capacity: number;

  @IsNumber()
  readonly with_luggage: number;

  @IsNumber()
  readonly total_capacity: number;

  @IsNumber()
  readonly year_built: number;
}
