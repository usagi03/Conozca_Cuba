import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { Meal_plan } from "src/modules/meal_plans/plans.entity";

export class UpdateRoomDto {
    @IsString()
    @IsOptional()
    readonly room_number?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly room_type?: string;

    @IsOptional()
    @IsNotEmpty()
    readonly room_cost?: number;

    @IsOptional()
    @IsNotEmpty()
    readonly room_surcharge?: number;
    
    @IsObject()
    @IsOptional()
    readonly plan?: Partial<Meal_plan>;
}