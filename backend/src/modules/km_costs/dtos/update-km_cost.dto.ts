import { IsNumber, IsOptional, IsString } from "class-validator";
import { UpdateModelDto } from "src/modules/transportation_models/dtos/update-model.dto";

export class UpdateKm_costDto extends UpdateModelDto {
  @IsString()
  @IsOptional()
  readonly type_trans_model?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

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
