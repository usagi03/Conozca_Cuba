import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateHotelDto } from "src/modules/hotels/dtos";

export class CreateKm_costDto extends CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly km_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly full_ride_cost: number;

  @IsNumber()
  @IsNotEmpty()
  readonly waited_hours_cost: number;
}
