import { IsNumber, IsOptional } from "class-validator";
import { UpdateModelDto } from "src/modules/transportation_models/dtos";

export class UpdateKm_hours_costDto extends UpdateModelDto {
  @IsNumber()
  @IsOptional()
  route_km_cost?: number;

  @IsNumber()
  @IsOptional()
  hours_cost?: number;

  @IsNumber()
  @IsOptional()
  extra_km_cost?: number;

  @IsNumber()
  @IsOptional()
  extras_hours_cost?: number;
}
