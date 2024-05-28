import { IsNumber, IsOptional, IsString } from "class-validator";
import { UpdateModelDto } from "src/modules/transportation_models/dtos";

export class UpdateRouteDto extends UpdateModelDto {
  @IsString()
  @IsOptional()
  description_route?: string;

  @IsNumber()
  @IsOptional()
  route_cost?: number;

  @IsNumber()
  @IsOptional()
  full_ride_cost?: number;
}
