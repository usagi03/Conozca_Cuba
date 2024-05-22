import { IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Acommodation } from "src/modules/acommodations/acommodations.entity";
import { Daily_activity } from "src/modules/activities/activities.entity";
import { Transportation } from "src/modules/transportations/transportation.entity";

export class UpdateContractDto {
  @IsNumber()
  @IsOptional()
  readonly id_contract: number;

  @IsDate()
  @IsOptional()
  readonly start_contract: Date;

  @IsDate()
  @IsOptional()
  readonly end_contract: Date;

  @IsDate()
  @IsOptional()
  readonly resolution_contract: Date;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsObject()
  @IsOptional()
  readonly transportation: Partial<Transportation>;

  @IsObject()
  @IsOptional()
  readonly acommodation: Partial<Acommodation>;

  @IsObject()
  @IsOptional()
  readonly activity: Partial<Daily_activity>;
}
