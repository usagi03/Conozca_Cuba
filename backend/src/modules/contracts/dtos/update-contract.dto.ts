import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateContractDto {
  @IsNumber()
  @IsOptional()
  id_contract?: number;

  @IsDate()
  @IsOptional()
  start_contract?: Date;

  @IsDate()
  @IsOptional()
  end_contract?: Date;

  @IsDate()
  @IsOptional()
  readonly resolution_contract: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  transportation?: number;

  @IsNumber()
  @IsOptional()
  acommodation?: number;

  @IsNumber()
  @IsOptional()
  activity?: number;
}
