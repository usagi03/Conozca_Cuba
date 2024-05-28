import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateModelDto } from "src/modules/transportation_models/dtos";

export class CreateKm_hours_costDto extends CreateModelDto {
  @IsNumber()
  @IsNotEmpty()
  route_km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  hours_cost: number;

  @IsNumber()
  @IsNotEmpty()
  extra_km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  extras_hours_cost: number;
}
