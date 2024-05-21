import { IsNumber, IsString } from "class-validator";

export class createKm_cost {
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
