import { IsString, IsNumber } from "class-validator";

export class update_TransportationDto {
  @IsNumber()
  readonly id_transportation: number;

  @IsString()
  readonly borrower: string;
}
