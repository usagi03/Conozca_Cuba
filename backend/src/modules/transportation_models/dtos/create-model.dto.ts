import { IsNotEmpty, IsString } from "class-validator";

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  type_transp_model: string;

  @IsString()
  description_tm: string;
}
