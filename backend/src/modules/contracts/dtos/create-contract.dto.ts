import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  start_contract: string;

  @IsString()
  @IsNotEmpty()
  end_contract: string;

  @IsString()
  @IsNotEmpty()
  resolution_contract: string;

  @IsString()
  description_contract: string;

  @IsNumber()
  @IsNotEmpty()
  transportation: number;

  @IsNumber()
  @IsNotEmpty()
  acommodation: number;

  @IsNumber()
  @IsNotEmpty()
  activity: number;
}
