import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateKm_hours_costDto{
  @IsString()
  @IsNotEmpty()
  description_tm: string;

  @IsString()
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
