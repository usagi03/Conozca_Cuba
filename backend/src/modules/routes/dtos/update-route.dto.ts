import { IsNumber, IsOptional, IsString } from "class-validator";
import { UpdateModelDto } from "src/modules/transportation_models/dtos/update-model.dto";

export class UpdateRouteDto extends UpdateModelDto {
  @IsString()
  @IsOptional()
  readonly description_route?: string;

  @IsNumber()
  @IsOptional()
  readonly route_cost?: number;

  @IsNumber()
  @IsOptional()
  readonly full_ride_cost?: number;
}
