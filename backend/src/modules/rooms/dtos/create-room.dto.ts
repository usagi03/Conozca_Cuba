import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Meal_plan } from "src/modules/meal_plans/plans.entity";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    readonly room_number: string;

    @IsString()
    @IsNotEmpty()
    readonly room_type: string;

    @IsNumber()
    @IsNotEmpty()
    readonly room_cost: number;

    @IsNumber()
    @IsNotEmpty()
    readonly room_surcharge: number;

    @IsObject()
    @IsNotEmpty()
    readonly plan: Partial<Meal_plan>;
}

