import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateKm_costDto {
  @IsNumber()
  @IsNotEmpty()
  readonly km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly full_ride_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly waited_hours_cost: number;
}
