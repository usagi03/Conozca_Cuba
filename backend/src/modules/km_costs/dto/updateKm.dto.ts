import { IsNumber, IsString } from "class-validator";

export class updateKm_cost {
  @IsNumber()
  readonly id_transp_model: number;

  @IsString()
  readonly type_trans_model: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly km_cost: number;

  @IsNumber()
  readonly full_ride_cost: number;

  @IsNumber()
  readonly waited_hours_cost: number;
}
