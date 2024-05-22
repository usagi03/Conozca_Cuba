import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Acommodation } from "src/modules/acommodations/acommodations.entity";
import { Daily_activity } from "src/modules/activities/activities.entity";
import { Transportation } from "src/modules/transportations/transportation.entity";

export class CreateContractDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id_contract: number;

  @IsDate()
  @IsNotEmpty()
  readonly start_contract: Date;

  @IsDate()
  @IsNotEmpty()
  readonly end_contract: Date;

  @IsDate()
  @IsNotEmpty()
  readonly resolution_contract: Date;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsObject()
  @IsNotEmpty()
  readonly transportation: Partial<Transportation>;

  @IsObject()
  @IsNotEmpty()
  readonly acommodation: Partial<Acommodation>;

  @IsObject()
  @IsNotEmpty()
  readonly activity: Partial<Daily_activity>;
}
