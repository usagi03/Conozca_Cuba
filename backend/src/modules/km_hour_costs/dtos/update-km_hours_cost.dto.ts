import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateKm_hours_costDto {
  @IsString()
  @IsOptional()
  description_tm?: string;

  @IsString()
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
