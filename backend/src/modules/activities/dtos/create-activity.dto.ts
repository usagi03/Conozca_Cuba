import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    type_activity: string;

    @IsString()
    @IsNotEmpty()
    day_activity: string;

    @IsString()
    @IsNotEmpty()
    time_activity: string;

    @IsNumber()
    @IsNotEmpty()
    cost_activity: number;

    @IsString()
    @IsNotEmpty()
    province_activity: string;

    @IsString()
    description_activity: string;

    @IsNumber()
    surcharge_activity: number;
}