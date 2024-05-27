import { IsNumber, IsOptional } from "class-validator";

export class UpdateKm_costDto {
  @IsNumber()
  @IsOptional()
  km_cost?: number;

  @IsNumber()
  @IsOptional()
  full_ride_cost?: number;

  @IsNumber()
  @IsOptional()
  waited_hours_cost?: number;
}
