import { IsNotEmpty, IsString } from "class-validator";

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  readonly type_transp_model: string;

  @IsString()
  readonly description_tm: string;
}
