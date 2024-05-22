import { IsNumber, IsOptional, IsString } from "class-validator";
import { UpdateModelDto } from "src/modules/transportation_models/dtos/update-model.dto";

export class UpdateKm_hours_costDto extends UpdateModelDto {
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
