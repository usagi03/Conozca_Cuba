import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateKm_costDto {
  @IsNumber()
  @IsNotEmpty()
  km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  full_ride_cost: number;

  @IsNumber()
  @IsNotEmpty()
  waited_hours_cost: number;
}
