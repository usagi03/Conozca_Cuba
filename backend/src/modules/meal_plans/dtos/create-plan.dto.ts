import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlanDto {
    @IsString()
    @IsNotEmpty()
    readonly plan_type: string;

    @IsNumber()
    @IsNotEmpty()
    readonly plan_cost: number;
}