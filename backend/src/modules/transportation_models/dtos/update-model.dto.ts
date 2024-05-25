import { IsString, IsOptional } from "class-validator";

export class UpdateModelDto {
  @IsString()
  @IsOptional()
  readonly description_tm?: string;
}
