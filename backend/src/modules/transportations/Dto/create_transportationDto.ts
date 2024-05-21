import { IsString } from "class-validator";

export class create_TransportationDto {
  @IsString()
  readonly borrower: string;
}
