import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateModelDto } from "src/modules/transportation_models/dtos/create-model.dto";

export class CreateRouteDto extends CreateModelDto{
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
