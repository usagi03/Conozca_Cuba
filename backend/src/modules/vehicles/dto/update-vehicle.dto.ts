import { IsNumber, IsString } from "class-validator";

export class UpdateVehicleDto {
  @IsNumber()
  readonly id_vehicle: number;

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
