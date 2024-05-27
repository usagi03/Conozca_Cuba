import { IsString, IsOptional } from "class-validator";

export class UpdateModelDto {
  @IsString()
  @IsOptional()
  description_tm?: string;
}
