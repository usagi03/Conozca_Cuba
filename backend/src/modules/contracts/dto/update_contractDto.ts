import { IsDate, IsNumber, IsString } from "class-validator";

export class updateContractDto {
  @IsDate()
  start_contract: Date;

  @IsDate()
  end_contract: Date;

  @IsDate()
  resolution_contract: Date;

  @IsString()
  description: string;

  @IsNumber()
  id_transportation: number;

  @IsNumber()
  id_hotel_room_season: number;

  @IsNumber()
  id_activity: number;
}
