import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateModelDto } from "src/modules/transportation_models/dtos";

export class CreateKm_costDto extends CreateModelDto {
  @IsNumber()
  @IsNotEmpty()
  km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  full_ride_km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  waiting_hours_cost: number;
}
