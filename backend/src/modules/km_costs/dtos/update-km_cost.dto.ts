import { IsNumber, IsOptional } from "class-validator";

export class UpdateKm_costDto {
  @IsNumber()
  @IsOptional()
  readonly km_cost?: number;

  @IsNumber()
  @IsOptional()
  readonly full_ride_cost?: number;

  @IsNumber()
  @IsOptional()
  readonly waited_hours_cost?: number;
}
