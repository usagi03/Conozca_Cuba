import { IsNotEmpty, IsString } from "class-validator";

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  readonly type_transp_model: string;

  @IsString()
  @IsNotEmpty()
  readonly description_tm: string;
}
