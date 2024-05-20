import { IsDate, IsNumber, IsString } from "class-validator";

export class createContractDto {
  @IsNumber()
  readonly id_contract: number;

  @IsDate()
  readonly start_contract: Date;

  @IsDate()
  readonly end_contract: Date;

  @IsDate()
  readonly resolution_contract: Date;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly id_transportation: number;

  @IsNumber()
  readonly id_hotel_room_season: number;

  @IsNumber()
  readonly id_activity: number;
}
