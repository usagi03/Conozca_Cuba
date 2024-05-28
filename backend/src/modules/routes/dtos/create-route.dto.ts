import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateModelDto } from "src/modules/transportation_models/dtos";

export class CreateRouteDto extends CreateModelDto {
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
