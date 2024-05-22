import { IsString, IsOptional, IsObject } from "class-validator";
import { Vehicle } from "src/modules/vehicles/vehicle.entity";

export class UpdateTransportationDto {
  @IsObject()
  @IsOptional()
  readonly transportation_model: Partial<Transportation_model>;

  @IsObject()
  @IsOptional()
  readonly vehicle: Partial<Vehicle>;

  @IsString()
  @IsOptional()
  readonly borrower: string;
}
