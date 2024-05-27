import { IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateTransportationDto {
  @IsNumber()
  @IsOptional()
  transportation_model?: number;

  @IsNumber()
  @IsOptional()
  vehicle?: number;

  @IsString()
  @IsOptional()
  readonly borrower?: string;
}
