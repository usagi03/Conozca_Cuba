import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRouteDto {
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
