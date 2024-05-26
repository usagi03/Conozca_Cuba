import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateKm_hours_costDto{
  @IsString()
  @IsNotEmpty()
  readonly description_tm: string;

  @IsString()
  @IsNotEmpty()
  readonly route_km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly hours_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly extra_km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly extras_hours_cost: number;
}
