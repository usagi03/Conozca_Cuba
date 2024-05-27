import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateContractDto {
  @IsNumber()
  @IsNotEmpty()
  id_contract: number;

  @IsDate()
  @IsNotEmpty()
  start_contract: Date;

  @IsDate()
  @IsNotEmpty()
  end_contract: Date;

  @IsDate()
  @IsNotEmpty()
  resolution_contract: Date;

  @IsString()
  description: string;

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
