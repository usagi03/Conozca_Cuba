import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  readonly description_route: string;

  @IsNumber()
  @IsNotEmpty()
  readonly route_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly full_ride_cost: number;
}
