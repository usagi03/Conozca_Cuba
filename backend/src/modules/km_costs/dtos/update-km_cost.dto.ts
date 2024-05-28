import { IsNumber, IsOptional } from "class-validator";
import { UpdateModelDto } from "src/modules/transportation_models/dtos";

export class UpdateKm_costDto extends UpdateModelDto {
  @IsNumber()
  @IsOptional()
  km_cost?: number;

  @IsNumber()
  @IsOptional()
  full_ride_km_cost?: number;

  @IsNumber()
  @IsOptional()
  waiting_hours_cost?: number;
}
