import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateContractDto {
  @IsString()
  @IsOptional()
  start_contract?: string;

  @IsString()
  @IsOptional()
  end_contract?: string;

  @IsString()
  @IsOptional()
  resolution_contract?: string;

  @IsString()
  @IsOptional()
  description_contract?: string;

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
