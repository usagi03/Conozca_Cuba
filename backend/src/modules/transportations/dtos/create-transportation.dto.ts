import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Vehicle } from "src/modules/vehicles/vehicle.entity";

export class CreateTransportationDto {
  @IsObject()
  @IsNotEmpty()
  readonly transportation_model: Partial<Transportation_model>;

  @IsObject()
  @IsNotEmpty()
  readonly vehicle: Partial<Vehicle>;

  @IsString()
  @IsNotEmpty()
  readonly borrower: string;
}
