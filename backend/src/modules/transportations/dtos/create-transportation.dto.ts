import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateTransportationDto {
  @IsNumber()
  @IsNotEmpty()
  transportation_model: number;

  @IsNumber()
  @IsNotEmpty()
  vehicle: number;

  @IsString()
  @IsNotEmpty()
  borrower: string;
}
