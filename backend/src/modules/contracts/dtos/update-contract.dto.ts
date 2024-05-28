import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateContractDto {
  @IsNumber()
  @IsOptional()
  id_contract?: number;

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
