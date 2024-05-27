import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRouteDto {
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
