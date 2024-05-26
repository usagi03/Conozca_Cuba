import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePlanDto {
    @IsString()
    @IsOptional()
    readonly plan_type?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly plan_cost?: number;;
}