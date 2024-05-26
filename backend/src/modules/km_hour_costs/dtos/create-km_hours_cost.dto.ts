import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateModelDto } from "src/modules/transportation_models/dtos/create-model.dto";

export class CreateKm_hours_costDto extends CreateModelDto{
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
