import { IsNotEmpty, IsString } from "class-validator";
import { Double } from "typeorm";

export class CreatePlanDto {
    @IsString()
    @IsNotEmpty()
    readonly plan_type: string;

    @IsString()
    @IsNotEmpty()
    readonly plan_cost: Double;
}