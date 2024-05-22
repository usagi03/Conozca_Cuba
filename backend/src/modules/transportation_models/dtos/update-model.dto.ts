import { IsString, IsOptional } from "class-validator";

export class UpdateModelDto {
  @IsString()
  @IsOptional()
  readonly type_transp_model?: string;

  @IsString()
  @IsOptional()
  readonly description_tm?: string;
}
