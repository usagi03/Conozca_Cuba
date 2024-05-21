import { IsNumber, IsString } from "class-validator";

export class UpdateKmHoursCost {
  @IsNumber()
  readonly id_transp_model: number;

  @IsString()
  readonly type_transp_model: string;

  @IsString()
  readonly description_tm: string;

  @IsString()
  readonly route_km_cost: number;

  @IsNumber()
  readonly hours_cost: number;

  @IsNumber()
  readonly extra_km_cost: number;

  @IsNumber()
  readonly extras_hours_cost: number;
}
