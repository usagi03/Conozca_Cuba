import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateKm_hours_costDto {
  @IsString()
  @IsOptional()
  readonly description_tm?: string;

  @IsString()
  @IsOptional()
  readonly route_km_cost?: number;

  @IsNumber()
  @IsOptional()
  readonly hours_cost?: number;

  @IsNumber()
  @IsOptional()
  readonly extra_km_cost?: number;

  @IsNumber()
  @IsOptional()
  readonly extras_hours_cost?: number;
}
