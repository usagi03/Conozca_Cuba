import { IsString, IsOptional, IsObject } from "class-validator";
import { Transportation_model } from "src/modules/transportation_models/model.entity";
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
