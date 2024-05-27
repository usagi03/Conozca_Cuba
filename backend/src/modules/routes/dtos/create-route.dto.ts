import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  description_route: string;

  @IsNumber()
  @IsNotEmpty()
  route_cost: number;

  @IsNumber()
  @IsNotEmpty()
  full_ride_cost: number;
}
