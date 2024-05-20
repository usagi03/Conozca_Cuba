import { IsNumber, IsString } from "class-validator";

export class UpdateRouteDto {
  @IsNumber()
  readonly id_transp_model: number;

  @IsString()
  readonly type_trans_model: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly description_route: string;

  @IsNumber()
  readonly route_cost: number;

  @IsNumber()
  readonly full_ride_cost: number;
}
